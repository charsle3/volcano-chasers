import { loadHeaderFooter } from "./utils.mjs";
import { date } from "./utils.mjs";
import { navBar } from "./utils.mjs";

loadHeaderFooter();
date();
navBar();


const display = document.querySelector('#display');

const userInput = new URLSearchParams(window.location.search);

display.innerHTML = 
    `<p>Name: ${userInput.get("fname")} ${userInput.get("lname")}</p>
    <p>Email: ${userInput.get("email")}</p>
    <p>Notify: ${userInput.get("notify")}</p>
    <p id="spacer"></p>`;

if (userInput.get("loc") || userInput.get("temp") || userInput.get("freq") || userInput.get("fav") || userInput.get("textM")) {
    display.innerHTML = display.innerHTML + `<h2>Personalization Information</h2><p>You're interested in....</p>`;
}

if (userInput.get("loc")) {
    const loc = document.createElement('p');
    loc.innerHTML = `Volcano Location`;
    display.appendChild(loc);
}
if (userInput.get("temp")) {
    const temp = document.createElement('p');
    temp.innerHTML = `Volcano Temperature`;
    display.appendChild(temp);
}
if (userInput.get("freq")) {
    const freq = document.createElement('p');
    freq.innerHTML = `Eruption Frequency`;
    display.appendChild(freq);
}
if (userInput.get("fav")) {
    const fav = document.createElement('p');
    fav.innerHTML = `The ${userInput.get("fav")} volcano`;
    display.appendChild(fav);
}

if (userInput.get("textM")) {
    const textM = document.createElement('p');
    textM.innerHTML = `We'll send you texts at: ${userInput.get("textM")}`;
    display.appendChild(textM);
}