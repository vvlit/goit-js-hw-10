import {fetchBreeds, fetchCatByBreed} from "./cat-api"

const refs = {
    breedSelect: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    errorMessage: document.querySelector('.error')
};

refs.breedSelect.hidden = true;
refs.loader.hidden = false;
refs.errorMessage.hidden = true;

refs.breedSelect.addEventListener("change", getCatInfo);

fetchBreeds()
    .then(catData => {
        const breedsMarkup = catData.map(({ id, name }) => {
            return `<option value="${id}">${name}</option>`
        })
        .join("");
        refs.breedSelect.insertAdjacentHTML("beforeend", breedsMarkup);
        refs.breedSelect.hidden = false;
        refs.loader.hidden = true;
    })
    .catch(error => {
        refs.errorMessage.hidden = false;
        refs.loader.hidden = true;
        console.log(error);
    });

function getCatInfo() {
    refs.loader.hidden = false;
    refs.catInfo.classList.add("visually-hidden");
    fetchCatByBreed(refs.breedSelect.value)
        .then(catData => {
            const src = catData[0].url;
            const name = catData[0].breeds[0].name;
            const description = catData[0].breeds[0].description;
            const temperament = catData[0].breeds[0].temperament;
            const catMarkup = `<img src="${src}" alt="${name}" />
                <div class="cat-text-container">                
                    <h2>${name}</h2> 
                    <p>${description}</p>
                    <p><b>Temperament:</b> ${temperament}</p>
                </div>`;
            refs.catInfo.innerHTML = catMarkup;
            refs.loader.hidden = true;
            refs.catInfo.classList.remove("visually-hidden");
        })
        .catch(error => {
            refs.errorMessage.hidden = false;
            refs.loader.hidden = true;
            console.log(error);
        });  
};




    

