import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_b3j2JUjeO6yTqQKN6AcIr1oMsDwcWa1FAjrNWiuqFEVUJxVWiyzfvMomBQ9OpGgG";

const urlBase = "https://api.thecatapi.com/v1";
const urlBreeds = "/breeds";
const urlCats = "/images/search";


function fetchBreeds() {
    return axios.get(`${urlBase}${urlBreeds}`)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.status);
            }
            return (response.data);
        })
};

function fetchCatByBreed(breedId) {
    return axios.get(`${urlBase}${urlCats}?breed_ids=${breedId}`)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.status);
            }
        return (response.data);
    })
};

    export {fetchBreeds, fetchCatByBreed}
