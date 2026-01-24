(function() {
  function getPersonImageUrl(personFilename) {
    if (!personFilename) return null;
    return `/assets/images/people/${personFilename}.jpg`;
  }

  function addImageToCard(card) {
    if (!card) return;

    const personFilename = card.getAttribute('data-person');
    const personImageUrl = getPersonImageUrl(personFilename);
    if (!personImageUrl) return;

    const testImg = new Image();
    testImg.onload = function() {
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

      img.src = personImageUrl;
    };

    testImg.onerror = function() {
      // No local image available; keep card text-only.
    };

    testImg.src = personImageUrl;
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
