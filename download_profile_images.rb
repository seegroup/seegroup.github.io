#!/usr/bin/env ruby
# frozen_string_literal: true

# Script to download profile images from MIUN pages for all current members.
# Images are saved to assets/images/people/ with the format: {person-filename}.jpg

# Add user gem path if nokogiri is installed there
ENV['GEM_PATH'] = "#{ENV['HOME']}/.local/share/gem/ruby/3.2.0:#{ENV['GEM_PATH']}" if ENV['HOME']

require 'net/http'
require 'uri'
require 'fileutils'
require 'yaml'
require 'nokogiri'

PEOPLE_DIR = '_people'
IMAGES_DIR = 'assets/images/people'
TIMEOUT = 10

def parse_person_file(filepath)
  content = File.read(filepath)
  match = content.match(/\A---\n(.*?)\n---\n/m)
  return nil unless match

  begin
    YAML.safe_load(match[1])
  rescue Psych::SyntaxError
    nil
  end
end

def extract_image_url(html_content, base_url)
  doc = Nokogiri::HTML(html_content)
  base_uri = URI(base_url)

  figure = doc.at_css('figure.bg-image-person[data-bg]')
  return figure['data-bg'] if figure && figure['data-bg']

  bg_div = doc.at_css('div.bg-image-person[style*="background-image"]')
  if bg_div
    style = bg_div['style'] || ''
    match = style.match(/url\(["']?([^"']+)["']?\)/)
    return match[1] if match
  end

  download_link = doc.at_css('a[href*="imagevault"][download]')
  return download_link['href'] if download_link && download_link['href']

  selectors = [
    'img[src*="imagevault"]',
    'img[src*="Personal"]',
    'img[alt*="photo"]',
    'img[alt*="Photo"]',
    '.profile-image img',
    'img.profile-photo'
  ]

  selectors.each do |selector|
    img = doc.at_css(selector)
    next unless img && img['src']

    img_url = img['src']
    img_url = URI.join(base_url, img_url).to_s unless img_url.start_with?('http')
    return img_url
  end

  nil
end

def download_image(image_url, output_path)
  uri = URI(image_url)
  
  Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == 'https', open_timeout: TIMEOUT, read_timeout: TIMEOUT) do |http|
    request = Net::HTTP::Get.new(uri)
    response = http.request(request)

    unless response.is_a?(Net::HTTPSuccess)
      puts "  Error: HTTP #{response.code}"
      return false
    end

    content_type = response['content-type'] || ''
    unless content_type.start_with?('image/')
      puts "  Warning: URL does not appear to be an image: #{content_type}"
      return false
    end

    File.binwrite(output_path, response.body)
    true
  end
rescue => e
  puts "  Error downloading image: #{e.message}"
  false
end

def fetch_person_image(person_file, person_data)
  filename = File.basename(person_file, '.md')
  homepage = person_data['homepage'] || ''
  name = person_data['name'] || filename
  group = person_data['group'] || ''

  return false unless group == 'current'
  return false if homepage.empty? || !homepage.include?('miun.se')

  puts "Processing #{name} (#{filename})..."

  begin
    uri = URI(homepage)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.scheme == 'https')
    http.open_timeout = TIMEOUT
    http.read_timeout = TIMEOUT

    response = http.get(uri.path + (uri.query ? "?#{uri.query}" : ''))

    unless response.is_a?(Net::HTTPSuccess)
      puts "  Error: HTTP #{response.code}"
      return false
    end

    if response.body.include?('404') || response.body.include?('Not Found') || response.body.include?('Page not found')
      puts "  Page not found, skipping"
      return false
    end

    image_url = extract_image_url(response.body, homepage)
    unless image_url
      puts "  No image found on page"
      return false
    end

    image_url = URI.join(homepage, image_url).to_s unless image_url.start_with?('http')

    output_path = File.join(IMAGES_DIR, "#{filename}.jpg")

    puts "  Found image: #{image_url}"
    puts "  Downloading to: #{output_path}"

    if download_image(image_url, output_path)
      puts "  ✓ Successfully downloaded"
      true
    else
      puts "  ✗ Failed to download"
      false
    end
  rescue => e
    puts "  Error: #{e.message}"
    false
  end
end

def main
  unless Dir.exist?(PEOPLE_DIR)
    puts "Error: #{PEOPLE_DIR} directory not found"
    exit 1
  end

  FileUtils.mkdir_p(IMAGES_DIR)

  person_files = Dir.glob(File.join(PEOPLE_DIR, '*.md')).sort

  if person_files.empty?
    puts "No person files found in #{PEOPLE_DIR}"
    exit 1
  end

  puts "Found #{person_files.length} person files"
  puts "Images will be saved to: #{IMAGES_DIR}\n"

  success_count = 0
  skip_count = 0

  person_files.each do |person_file|
    person_data = parse_person_file(person_file)

    unless person_data
      puts "Skipping #{File.basename(person_file)}: Could not parse front matter"
      skip_count += 1
      next
    end

    if fetch_person_image(person_file, person_data)
      success_count += 1
    else
      skip_count += 1
    end
  end

  puts "\n#{'=' * 50}"
  puts "Summary:"
  puts "  Successfully downloaded: #{success_count}"
  puts "  Skipped/Failed: #{skip_count}"
  puts "#{'=' * 50}"
end

main if __FILE__ == $PROGRAM_NAME
