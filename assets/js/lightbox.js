// Lightweight image lightbox for news thumbnails
(function() {
  function createLightbox() {
    const existing = document.getElementById('image-lightbox');
    if (existing) return existing;

    const overlay = document.createElement('div');
    overlay.id = 'image-lightbox';

    const img = document.createElement('img');
    img.id = 'image-lightbox-img';

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function() {
      overlay.classList.remove('is-visible');
      img.src = '';
    });

    return overlay;
  }

  function initNewsImages() {
    const cards = document.querySelectorAll('.news-list .card');
    if (!cards.length) return;

    const overlay = createLightbox();
    const overlayImg = overlay.querySelector('#image-lightbox-img');

    cards.forEach(card => {
      const images = Array.from(card.querySelectorAll('img'));
      if (!images.length) return;

      // Group images in a horizontal row container
      const row = document.createElement('div');
      row.className = 'news-images-row';

      images.forEach(img => {
        // Move image into row
        const parent = img.parentElement;
        row.appendChild(img);
        // Remove now-empty parent paragraphs to avoid extra gaps
        if (parent && parent.tagName === 'P' && parent.textContent.trim() === '' && !parent.querySelector('img')) {
          parent.remove();
        }

        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
          e.stopPropagation();
          overlayImg.src = img.src;
          overlay.classList.add('is-visible');
        });
      });

      // Insert the row at the position of the first original image parent
      const firstImage = images[0];
      const originalParent = firstImage.parentElement;
      if (originalParent && originalParent.parentElement) {
        originalParent.parentElement.insertBefore(row, originalParent);

        // If original parent became empty, remove it
        if (originalParent.tagName === 'P' &&
            originalParent.textContent.trim() === '' &&
            !originalParent.querySelector('img')) {
          originalParent.remove();
        }
      } else {
        // Fallback: append at end of card
        card.appendChild(row);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsImages);
  } else {
    initNewsImages();
  }
})();

