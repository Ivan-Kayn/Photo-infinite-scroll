const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

// store
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// unsplash api
let imageCount = 5;
const apiKey = '_cEGrBRtZni6CziellvNo_OVUvua4S5GsJF8wKlSaZI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// checking if all images were loaded
function imageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        imageCount = 10;
    }
}

// Create Elements For Links and Photos, and Add to DOM
function displayPhotos() {
    totalImages += photosArray.length;
    photosArray.forEach((photo) => {
        // Create photo element template
        // a element
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // img element
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description
        });
        // checking when when is finished loading
        img.addEventListener('load', imageLoaded);


        // putting img into a
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}

// Get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (e) {
        console.log(e);
    }
}

// Scroll checking to load new photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();

