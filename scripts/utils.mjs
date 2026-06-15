export async function loadHeaderFooter() {

    const resHeader = await fetch("../partials/header.html");
    const header = await resHeader.text();

    const resFooter = await fetch("../partials/footer.html");
    const footer = await resFooter.text();

    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');

    headerElement.innerHTML = header;
    footerElement.innerHTML = footer;
}

export function navBar() {
    setTimeout(() => {
        const navButton = document.querySelector("#ham-btn");
        const navBar = document.querySelector("#nav-bar");

        navButton.addEventListener('click', () => {
            navButton.classList.toggle('show');
            navBar.classList.toggle('show');
        });        

        // Make sure to change the ID's and variable names for the following code.

        // const  = document.querySelector('#');
        // const  = document.querySelector('#');
        // const  = document.querySelector('#');

        // home.addEventListener('click', () => {
        //     home.classList.add("current");
        //     chamber.classList.remove("current");
        //     final.classList.remove("current");
        // });
    }, 1000);
}

export function date() {
    setTimeout(() => {
        const currentyear = document.querySelector("#currentyear");
        const lastmodified = document.querySelector("#lastmodified");
        const today = new Date();

        currentyear.innerHTML = `&copy${today.getFullYear()}`;

        lastmodified.innerHTML = document.lastModified;
    }, 1000); 
}