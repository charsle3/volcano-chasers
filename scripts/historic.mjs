import { loadHeaderFooter } from "./utils.mjs";
import { date } from "./utils.mjs";
import { navBar } from "./utils.mjs";
import { getUSVolcanos } from "./getVolcanos.mjs";

loadHeaderFooter();
date();
navBar("historic");

async function displayVolcanos(volcanoData) {
    
    const volcanoDisplay = document.getElementById('volcanoSelect');    

    volcanoDisplay.innerHTML = ``;

    volcanoData.forEach(volcano => {
        const button = document.createElement('button');
        button.innerHTML = `${volcano.volcano_name}`;

        button.addEventListener('click', () => {
            displaySpotlight(volcano);
            localStorage.setItem("most recent", JSON.stringify(volcano));
        })

        volcanoDisplay.appendChild(button);
    });
}

function displaySpotlight(volcano) {
    const spotlight = document.getElementById('volcanoSpotlight');
    spotlight.innerHTML = ``;

    const name = document.createElement('p');
    name.innerHTML = `${volcano.volcano_name}, #${volcano.vnum}`;

    const fav = document.createElement('button');
    fav.innerHTML = `Favorite Volcano?`;

    fav.addEventListener('click', () => {
        localStorage.setItem("favorite", JSON.stringify(volcano));
        fav.innerHTML = `Favorited!`;

        setTimeout(() => {
            fav.innerHTML = `Favorite Volcano?`;
        }, 2000)
    });

    const visit = document.createElement('button');
    visit.innerHTML = `Would you like to visit?`;

    visit.addEventListener('click', () => {
        let visitList = JSON.parse(localStorage.getItem("visit"));

        if (!visitList) {
            visitList = [volcano];
        }
        else {
            let contains = false;
            visitList.forEach(volcanoVisit => {if(volcano.vnum == volcanoVisit.vnum){contains = true;}});

            if (!contains) {
                visitList.push(volcano);
            }
        }
        
        localStorage.setItem("visit", JSON.stringify(visitList));
        visit.innerHTML = `logged!`;

        setTimeout(() => {
            visit.innerHTML = `Would you like to visit?`;
        }, 2000)
    });

    const region = document.createElement('p');
    region.innerHTML = `${volcano.region}`;

    const boiler = document.createElement('p');

    if (volcano.boilerplate) {
        boiler.innerHTML = `${volcano.boilerplate}`;
    }
    else {
        boiler.innerHTML = `No Description Provided`;
    }

    const image = document.createElement('img');

    if (volcano.volcano_image_url) {
        image.setAttribute('src', volcano.volcano_image_url);
        image.setAttribute('alt', `an image of ${volcano.volcano_name}`);
        image.setAttribute('loading', "lazy");
    }

    const url = document.createElement('p');
    url.innerHTML = `For more information visit ${volcano.volcano_url}`;

    spotlight.appendChild(name);
    spotlight.appendChild(region);
    spotlight.appendChild(fav);
    spotlight.appendChild(visit);
    spotlight.appendChild(boiler);
    spotlight.appendChild(image);
    spotlight.appendChild(url);
}

function observatoryFilters(volcanoData) {

    const observatories = ["All"];
    const filterContainer = document.getElementById('filterButtons');


    volcanoData.forEach(volcano => {
        if (!observatories.includes(volcano.obs_fullname)) {
            observatories.push(volcano.obs_fullname);
        }
    });

    observatories.forEach(observatory => {
        const button = document.createElement('button');
        button.innerHTML = `${observatory}`;

        button.addEventListener('click', () => {
            const particularOBSV = volcanoData.filter(volcano => volcano.obs_fullname == observatory);
            if (observatory != 'All'){
                displayVolcanos(particularOBSV);
            }
            else {
                displayVolcanos(volcanoData);
            }
        });

        filterContainer.appendChild(button);
    });
}


const data = await getUSVolcanos();
displayVolcanos(data);

observatoryFilters(data);

const spot = JSON.parse(localStorage.getItem("most recent"))

if (spot) {
    displaySpotlight(spot);
}