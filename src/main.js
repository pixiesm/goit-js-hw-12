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
loader: document.querySelector('.loader')
};
// function showLoader() { refs.loader.classList.remove('hidden'); }
// function hideLoader() { refs.loader.classList.add('hidden'); }

let photosName;
let currentPage = 1;

refs.searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    photosName = refs.input.value.trim();
    if (photosName === '') {
        iziToast.warning({
            title: 'warning',
            message: 'Search field can not be empty!',
            position: 'topRight'
        });
        return;
    }
    // showLoader();
    refs.picturesList.innerHTML = "";
    const data =  await getImage(photosName, currentPage);
    markupImages(data.hits);
    
});



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
// function resetForm() { refs.searchForm.reset(); }