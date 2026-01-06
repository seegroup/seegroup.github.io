(function() {
  function createDefaultImage() {
    return '/assets/images/Bildsaknas.jpeg';
  }

  function getPersonImageUrl(personFilename) {
    if (!personFilename) return null;
    return `/assets/images/people/${personFilename}.jpg`;
  }

  function addImageToCard(card) {
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
    
    const personFilename = card.getAttribute('data-person');
    const personImageUrl = getPersonImageUrl(personFilename);
    const defaultImageUrl = createDefaultImage();
    
    if (personImageUrl) {
      img.onerror = function() {
        img.src = defaultImageUrl;
        img.onerror = null;
      };
      img.src = personImageUrl;
    } else {
      img.src = defaultImageUrl;
      img.onerror = null;
    }
  }

  function initImages() {
    function showImages() {
      const peopleSection = document.querySelector('#content');
      if (!peopleSection) {
        setTimeout(showImages, 50);
        return;
      }
      
      const peopleCards = peopleSection.querySelectorAll('.card[data-person], a.card-link.card[data-person]');
      
      peopleCards.forEach(card => {
        if (card.querySelector('.profile-image')) return;
        
        addImageToCard(card);
      });
    }
    
    showImages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImages);
  } else {
    initImages();
  }
})();
