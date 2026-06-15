import { loadHeaderFooter } from "./utils.mjs";
import { date } from "./utils.mjs";
import { navBar } from "./utils.mjs";
import { getUSVolcanos } from "./getVolcanos.mjs";

loadHeaderFooter();
date();
navBar("historic");

async function displayVolcanos(volcanoData) {
    
    const volcanoDisplay = document.getElementById('volcanoSelect');
    const spotlight = document.getElementById('volcanoSpotlight');

    volcanoDisplay.innerHTML = ``;

    volcanoData.forEach(volcano => {
        const button = document.createElement('button');
        button.innerHTML = `${volcano.volcano_name}`;

        button.addEventListener('click', () => {
            spotlight.innerHTML = ``;

            const name = document.createElement('p');
            name.innerHTML = `${volcano.volcano_name}, #${volcano.vnum}`;

            const boiler = document.createElement('p');

            if (volcano.boilerplate) {
                boiler.innerHTML = `${volcano.boilerplate}`;
            }
            else {
                boiler.innerHTML = `No Description Provided`;
            }

            spotlight.appendChild(name);
            spotlight.appendChild(boiler);
        })

        volcanoDisplay.appendChild(button);
    });
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
