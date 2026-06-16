import { loadHeaderFooter } from "./utils.mjs";
import { date } from "./utils.mjs";
import { navBar } from "./utils.mjs";
import { getElevatedVolcanos } from "./getVolcanos.mjs";


loadHeaderFooter();
date();
navBar("current");

const elevatedVolcanos = await getElevatedVolcanos();

function displayElevated(data) {
    const active = document.getElementById('active');

    if (data.length > 0) {
        data.forEach(volcano => {
            const card = document.createElement('section');

            const title = document.createElement('h3');
            title.innerHTML = `${volcano.volcano_name_appended}, <em>${volcano.vnum}</em>`;

            const elev = document.createElement('p');
            elev.innerHTML = `<strong>Elevation:</strong> ${volcano.elevation_meters}m, ${volcano.elevation_feet}ft`;

            const alert = document.createElement('p');
            alert.innerHTML = `<strong>Alert Level:</strong> ${volcano.alert_level}, (${volcano.cap_certainty})`;

            if (volcano.color_code == "YELLOW") {
                card.classList.add('YELLOW');
            }
            else if (volcano.color_code == "ORANGE") {
                card.classList.add('ORANGE');
            }
            else if (volcano.color_code == "RED") {
                card.classList.add('RED');
            }

            const sev = document.createElement('p');
            sev.innerHTML = `<strong>Severity:</strong> ${volcano.cap_severity}`;

            const urgency = document.createElement('p');
            urgency.innerHTML = `<strong>Urgency:</strong> ${volcano.cap_urgency}`;

            card.addEventListener('click', () => {
                window.open(volcano.notice_url, '_blank');
            });

            card.appendChild(title);
            card.appendChild(elev);
            card.appendChild(alert);
            card.appendChild(sev);
            card.appendChild(urgency);
            active.appendChild(card);
        });
    }
    else {
        const quiet = document.createElement('p');
        quiet.innerHTML = `No pending eruptions detected`;

        active.appendChild(quiet);
    }

    
}

function displayFavorite(fav) {
    const display = document.getElementById('favVolcano');
    display.innerHTML = ``;

    const name = document.createElement('p');
    name.innerHTML = `${fav.volcano_name}, #${fav.vnum}`;

    const image = document.createElement('img');

    if (fav.volcano_image_url) {
        image.setAttribute('src', fav.volcano_image_url);
        image.setAttribute('alt', `an image of ${fav.volcano_name}`);
        image.setAttribute('loading', "lazy");
    }

    display.appendChild(name);
    display.appendChild(image);
}

displayElevated(elevatedVolcanos);

const fav = JSON.parse(localStorage.getItem("favorite"));

if (fav) {
    displayFavorite(fav);
}




