(function() {
  const IMAGE_CACHE_KEY = 'miun_profile_images';
  const CACHE_EXPIRY_DAYS = 30;

  function getCachedImages() {
    try {
      const cached = localStorage.getItem(IMAGE_CACHE_KEY);
      if (!cached) return {};
      
      const data = JSON.parse(cached);
      const now = Date.now();
      
      if (data.expiry && now > data.expiry) {
        localStorage.removeItem(IMAGE_CACHE_KEY);
        return {};
      }
      
      return data.images || {};
    } catch (e) {
      return {};
    }
  }

  function saveCachedImages(images) {
    try {
      const expiry = Date.now() + (CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify({
        images: images,
        expiry: expiry
      }));
    } catch (e) {
      console.warn('Could not save images to cache:', e);
    }
  }

  let proxyFailureCount = 0;
  let proxyDisabled = false;
  const MAX_PROXY_FAILURES = 1; // Stop after first failure

  async function fetchImageFromMIUN(url) {
    // If proxy is disabled or has failed, don't try anymore
    if (proxyDisabled || proxyFailureCount >= MAX_PROXY_FAILURES) {
      return null;
    }

    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      
      // Use a timeout to avoid hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(proxyUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        signal: controller.signal
      }).catch(err => {
        clearTimeout(timeoutId);
        proxyFailureCount++;
        proxyDisabled = true; // Disable proxy after first failure
        return null;
      });
      
      clearTimeout(timeoutId);
      
      if (!response || !response.ok) {
        if (response && (response.status >= 500 || response.status === 0)) {
          proxyFailureCount++;
          proxyDisabled = true; // Disable proxy after first failure
        }
        return null;
      }
      
      const data = await response.json().catch(() => {
        proxyFailureCount++;
        proxyDisabled = true; // Disable proxy after first failure
        return null;
      });
      
      if (!data || !data.contents) {
        return null;
      }
      
      // Reset failure count on success
      proxyFailureCount = 0;
      
      if (data.contents.includes('404') || data.contents.includes('Not Found') || data.contents.includes('Page not found')) {
        return null;
      }
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      
      const figure = doc.querySelector('figure.bg-image-person.lazyload[data-bg]');
      if (figure && figure.dataset.bg) {
        return figure.dataset.bg;
      }
      
      const bgDiv = doc.querySelector('.bg-image-person[style*="background-image"]');
      if (bgDiv) {
        const style = bgDiv.getAttribute('style');
        const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (match && match[1]) {
          return match[1];
        }
      }
      
      const downloadLink = doc.querySelector('a[href*="imagevault"][download]');
      if (downloadLink && downloadLink.href) {
        return downloadLink.href;
      }
      
      const selectors = [
        'img[src*="imagevault"]',
        'img[src*="Personal"]',
        'img[alt*="photo"]',
        'img[alt*="Photo"]',
        '.profile-image img',
        'img.profile-photo'
      ];
      
      let img = null;
      for (const selector of selectors) {
        img = doc.querySelector(selector);
        if (img && img.src) break;
      }
      
      if (img && img.src) {
        let imageUrl = img.src;
        if (!imageUrl.startsWith('http')) {
          imageUrl = new URL(imageUrl, url).href;
        }
        return imageUrl;
      }
      
      return null;
    } catch (e) {
      // Silently fail - default image will be shown
      if (e.name !== 'AbortError') {
        proxyFailureCount++;
        proxyDisabled = true; // Disable proxy after first failure
      }
      return null;
    }
  }

  let isLoading = false;

  async function loadProfileImages() {
    if (isLoading) return;
    isLoading = true;
    
    const peopleSection = document.querySelector('#content');
    if (!peopleSection) {
      isLoading = false;
      return;
    }
    
    const peopleCards = peopleSection.querySelectorAll('a.card-link.card');
    
    if (peopleCards.length === 0) {
      isLoading = false;
      return;
    }
    
    const cached = getCachedImages();
    const peopleData = [];
    
    // Collect people who need fetching (no cached image)
    peopleCards.forEach(card => {
      if (!card.href || (!card.href.includes('miun.se/Personal') && !card.href.includes('miun.se/en/personnel'))) return;
      
      const nameElement = card.querySelector('h2');
      if (!nameElement) return;
      
      const name = nameElement.textContent.trim();
      
      // Only fetch if no cached image exists
      // Cached images were already loaded in initImages()
      if (!cached[card.href]) {
        peopleData.push({
          name: name,
          url: card.href,
          card: card
        });
      }
    });
    
    if (peopleData.length > 0 && !proxyDisabled && proxyFailureCount < MAX_PROXY_FAILURES) {
      const updatedCache = { ...cached };
      
      // Fetch images with a small delay between requests to avoid overwhelming the proxy
      for (const person of peopleData) {
        if (proxyDisabled || proxyFailureCount >= MAX_PROXY_FAILURES) {
          break; // Stop trying if proxy is disabled or failing
        }
        
        try {
          const imageUrl = await fetchImageFromMIUN(person.url);
          
          if (imageUrl) {
            updatedCache[person.url] = imageUrl;
            addImageToCard(person.card, imageUrl);
          }
          // If no image URL, default image is already shown, no need to update
          
          // Small delay between requests
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (e) {
          // Silently fail - default image is already shown
        }
      }
      
      saveCachedImages(updatedCache);
    }
    
    isLoading = false;
  }

  function createDefaultImage() {
    const svg = '<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="#e5e7eb"/><circle cx="40" cy="35" r="12" fill="#9ca3af"/><path d="M 20 60 Q 20 50, 40 50 Q 60 50, 60 60 L 60 80 L 20 80 Z" fill="#9ca3af"/></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function addImageToCard(card, imageUrl, isDefault = false) {
    if (!card) return;
    
    let imageContainer = card.querySelector('.profile-image');
    let img = null;
    
    if (imageContainer) {
      img = imageContainer.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        imageContainer.appendChild(img);
      }
    } else {
      imageContainer = document.createElement('div');
      imageContainer.className = 'profile-image';
      
      img = document.createElement('img');
      img.alt = '';
      imageContainer.appendChild(img);
      
      const firstChild = card.firstElementChild;
      if (firstChild) {
        card.insertBefore(imageContainer, firstChild);
      } else {
        card.appendChild(imageContainer);
      }
      
      card.classList.add('has-image');
    }
    
    const finalImageUrl = imageUrl || createDefaultImage();
    const defaultImageUrl = createDefaultImage();
    
    if (imageUrl && imageUrl !== defaultImageUrl) {
      img.onerror = function() {
        if (img.src !== defaultImageUrl && !img.src.includes('data:image/svg')) {
          img.src = defaultImageUrl;
          img.onerror = null;
        }
      };
      
      img.onload = function() {
        if (img.src.includes('404') || img.src.includes('error')) {
          img.src = defaultImageUrl;
        }
      };
      
      img.src = imageUrl;
    } else {
      img.src = defaultImageUrl;
      img.onerror = null;
    }
  }

  function initImages() {
    function showImages() {
      const peopleSection = document.querySelector('#content');
      if (!peopleSection) {
        // Retry if content not ready yet
        setTimeout(showImages, 50);
        return;
      }
      
      const peopleCards = peopleSection.querySelectorAll('a.card-link.card');
      const cached = getCachedImages();
      
      peopleCards.forEach(card => {
        if (!card.href) return;
        const isMIUN = card.href.includes('miun.se/Personal') || card.href.includes('miun.se/en/personnel');
        if (!isMIUN) return;
        
        // Skip if image already exists
        if (card.querySelector('.profile-image')) return;
        
        // First priority: use cached image if available
        if (cached[card.href]) {
          addImageToCard(card, cached[card.href]);
        } else {
          // Second priority: show default image immediately
          addImageToCard(card, null, true);
        }
      });
      
      // Then fetch new images for people without cached images
      setTimeout(loadProfileImages, 100);
    }
    
    showImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImages);
  } else {
    initImages();
  }
})();
