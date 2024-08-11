// функцііїдля відображення


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const lightbox = new SimpleLightbox('.gallery-list a', {
    captionsData: 'alt',
    captionsDelay: 250,
});


 const refs = { input: document.querySelector('.form-input'),
    searchForm: document.querySelector('.search-form'),
    picturesList: document.querySelector('.gallery-list'),
};

export function markupImages(images) { 
    const markup = images.map(image => {
        return `<li class="gallery-item">
      <a href='${image.largeImageURL}' class="gallery-link">
      <img src='${image.webformatURL}' 
      alt='${image.tags}'
    width=360
      height=200
      class="gallery-image"/>
    </a>
      <div class="info-image"> 
        <p class="info-text"> LIKES: <span class="info-image-span">${image.likes} </span></p>
        <p class="info-text"> VIEWS:<span class="info-image-span">${image.views} </span></p>
         <p class="info-text"> COMMENTS:<span class="info-image-span">${image.comments} </span></p>
        <p class="info-text"> DOWNLOADS:<span class="info-image-span">${image.downloads} </span></p>
      </div>
    </li>`;
    }).join('');
  refs.picturesList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
 
}
