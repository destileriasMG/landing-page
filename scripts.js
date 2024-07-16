console.log('Script cargado');

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('logo');
    if (logo) {
        logo.classList.add('rotate');
        console.log('Clase "rotate" añadida al logo');
    } else {
        console.error('No se encontró el elemento con id "logo"');
    }

    // Inicializar la vista por defecto
    toggleView();

    // Validación del formulario de contacto
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        let email = document.getElementById("email").value;
        if (!validateEmail(email)) {
            alert("Por favor, introduce un correo electrónico válido.");
            event.preventDefault();
        }
    });

    // Inicializar carrusel de productos
    initCarousels();

    // Inicializar carrusel de videos
    initVideoCarousel();
});

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

function toggleCategory(categoryId) {
    const categoryContent = document.getElementById(categoryId);
    if (categoryContent.style.display === "block") {
        categoryContent.style.display = "none";
    } else {
        categoryContent.style.display = "block";
    }
}

let slideIndex = {};

function showSlides(categoryId) {
    const slides = document.querySelectorAll(`#carousel-${categoryId} .slide`);
    if (!slideIndex[categoryId]) slideIndex[categoryId] = 0;
    slides.forEach((slide, index) => {
        slide.style.display = (index === slideIndex[categoryId]) ? 'block' : 'none';
    });
}

function nextSlide(categoryId) {
    const slides = document.querySelectorAll(`#carousel-${categoryId} .slide`);
    slideIndex[categoryId] = (slideIndex[categoryId] + 1) % slides.length;
    showSlides(categoryId);
}

function prevSlide(categoryId) {
    const slides = document.querySelectorAll(`#carousel-${categoryId} .slide`);
    slideIndex[categoryId] = (slideIndex[categoryId] - 1 + slides.length) % slides.length;
    showSlides(categoryId);
}

function toggleView() {
    const checkbox = document.getElementById('view-toggle');
    const portafolio = document.getElementById('portafolio');
    const categories = document.querySelectorAll('.category-content');

    categories.forEach(category => {
        const categoryId = category.id;
        const products = category.querySelectorAll('.product');
        const carouselContent = document.querySelector(`#carousel-${categoryId}`);
        //const listContent = category.querySelector('.list-content');

        carouselContent.innerHTML = '';
        products.forEach(product => {
            const name = product.getAttribute('data-name');
            const desc = product.getAttribute('data-desc');
            const link = product.getAttribute('data-link');
            const img = product.getAttribute('data-img');

            const productHTML = `
                <img src="${img}" alt="${name}" onclick="expandImage('${img}')">
                <div class="product-details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <a href="${link}" target="_blank">Más información</a>
                </div>
            `;

            if (checkbox.checked) {
                // Vista carrusel
                portafolio.classList.add('carousel-view');
                portafolio.classList.remove('list-view');
                const slide = document.createElement('div');
                slide.classList.add('slide');
                slide.innerHTML = productHTML;
                carouselContent.appendChild(slide);
                showSlides(categoryId); // Mostrar la primera diapositiva para cada categoría
            } else {
                // Vista lista
                portafolio.classList.add('list-view');
                portafolio.classList.remove('carousel-view');
                product.innerHTML = productHTML;
            }
        });
    });
}

function expandImage(src) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `<div class="modal-content"><span class="close">&times;</span><img src="${src}" class="modal-image"></div>`;
    document.body.appendChild(modal);

    modal.querySelector('.close').onclick = function() {
        modal.remove();
    }

    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    }
}

function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-content');
    carousels.forEach(carousel => {
        const categoryId = carousel.id.replace('carousel-', '');
        showSlides(categoryId);
    });
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

let videoIndex = 0;

function showVideos() {
    const videos = document.querySelectorAll('.video-content video');
    videos.forEach((video, index) => {
        video.style.display = (index === videoIndex) ? 'block' : 'none';
        video.controls = false;  // Oculta los controles del video
    });
}

function nextVideo() {
    const videos = document.querySelectorAll('.video-content video');
    videoIndex = (videoIndex + 1) % videos.length;
    showVideos();
}

function prevVideo() {
    const videos = document.querySelectorAll('.video-content video');
    videoIndex = (videoIndex - 1 + videos.length) % videos.length;
    showVideos();
}

function initVideoCarousel() {
    showVideos();
}
