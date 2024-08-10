// key: 44685360-74500565ee10f6b109a60bbe8
import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com/";
// axios.defaults.params = {API_KEY : '44685360-74500565ee10f6b109a60bbe8'}


export async function getImage(image, currentPage) {
    // const URL = 'https://pixabay.com/api/';
    // const API_KEY = '44685360-74500565ee10f6b109a60bbe8';
    const params = {
        key: '44685360-74500565ee10f6b109a60bbe8',
        q: image,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: currentPage,
       
    };

    // const url = `${URL}?${params}`;
    const response = await axios.get('api/', { params });
    
    return response.data;
   
   
    // fetch(url).then((response) => {
    //     if (!response.ok) { throw new Error(response.status); }
    //     return response.json();
    // }).catch((error) => {
    //     iziToast.error({
    //       position: "topRight",
    //         message: `${error}`, 
    //     });
    //   });
        
        
        // data => data.json());
    
};
    
