import axios from "axios";

export const getProducts = async (size) => {
    let response = await axios.get(`https://world.openfoodfacts.org/?json=true&page_size=${size}`);

    return response;
}

export const detailProduct = async (id) => {
    let response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${id}.json`);
    return response;
}

export const searchProducts = async(search, size) => {
    let response = await axios.get(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${search}&json=true&page_size=${size}`);
    return response;
}
