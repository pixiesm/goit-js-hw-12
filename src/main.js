// логіка додатку

import { getImage } from "./js/pixabay-api";
// getImage("cat").then((data) => { console.log(data) }).catch((error) => { console.log(error) });


import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"

import axios from "axios";

import {
    markupImages,
} from "./js/render-functions";



export const refs = { input: document.querySelector('.form-input'),
btn: document.querySelector('.search-btn'),
    searchForm: document.querySelector('.search-form'),
    picturesList: document.querySelector('.gallery-list'),
    loader: document.querySelector('.loader'),
    loader2: document.querySelector('.loader2'),
loadBtn: document.querySelector('.load-btn'),
};

function showLoadBtn(){refs.loadBtn.classList.remove('hidden')}
function hideLoadBtn(){refs.loadBtn.classList.add('hidden')}

function showLoader() { refs.loader.classList.remove('hidden'); }
function hideLoader() { refs.loader.classList.add('hidden'); }

function showLoader2() { refs.loader2.classList.remove('hidden'); }
function hideLoader2() { refs.loader2.classList.add('hidden'); }

let photosName;
let currentPage = 1;
let maxPage = 1;
const perPage = 15;

refs.searchForm.addEventListener('submit', async e => {
    e.preventDefault();

    currentPage = 1;
    photosName = refs.input.value.trim();
    if (photosName === '') {
        iziToast.warning({
            title: 'warning',
            message: 'Search field can not be empty!',
            position: 'topRight'
        });
        return;
    }

    
showLoader()
    refs.picturesList.innerHTML = "";
    try {
        const data = await getImage(photosName, currentPage);
         maxPage = Math.ceil(data.total / perPage);
        markupImages(data.hits);
    hideLoader();


        if (maxPage === 0) { iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            displayMode: 'once',
        });
            
            return;
        }
        updateBtnStatus();
         resetForm();
    }
    catch {
        iziToast.error({
            title: 'Error',
            
        });
}
  
    // resetForm();      
});

refs.loadBtn.addEventListener('click', async () => {
    currentPage++;
    hideLoadBtn();
    showLoader2();
    try {
        const data = await getImage(photosName, currentPage);
        hideLoader2();
        markupImages(data.hits);

         
   
    }
    catch { iziToast.error({title: 'Error'})}
    hideLoader2(); 
     skipElements();
   updateBtnStatus();



 })


function updateBtnStatus() { 
    if (currentPage >= maxPage)
    {
        hideLoadBtn();

        if (maxPage !== 0) {  iziToast.info({ message: "We're sorry, but you've reached the end of search results." })}
       }
    else { showLoadBtn(); }
}

    // .then(({ hits }) => {
    //     if (hits.length === 0) {
    //         iziToast.error({
    //             title: 'Error',
    //             message: 'Sorry, there are no images matching your search query. Please try again!',
    //             position: 'topRight',
    //             displayMode: 'once',
    //         })
    //         return;
    //     }
        // hideLoader()
//         markupImages(hits);
//         resetForm();

//     }).catch((err) => {
//         iziToast.error({
//             position: "topRight",
//             message: `${err}`,
//         })
//     }).finally(() => hideLoader());
    
    

// })
function resetForm() { refs.searchForm.reset(); }
function skipElements() {
    
    const liElem = refs.picturesList.children[0];
    const height = liElem.getBoundingClientRect().height;

    scrollBy({
        top: height,
    behavior: 'smooth',})
}