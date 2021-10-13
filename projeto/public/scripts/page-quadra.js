// Mapa
const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
};

// Seleciona valores do html
const lat = document.querySelector('span[data-lng]').dataset.lat;
const lng = document.querySelector('span[data-lat]').dataset.lng;

// Cria mapa
const map = L.map('mapid', options).setView([lat, lng], 15);

// Título do mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Cria ícone
const icon = L.icon({
    iconUrl: '/images/map-marker.svg',
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

// Pop-up no mapa
L.marker([lat, lng], { icon }).addTo(map);

// Galeria de imagens
function selectImage(event) {
    const button = event.currentTarget;

    // Remove todas as classes .active
    const buttons = document.querySelectorAll('.images button');
    buttons.forEach(removeActiveClass);

    function removeActiveClass(button) {
        button.classList.remove('active');
    }

    // Seleciona a imagem clicada
    const image = button.children[0];
    const imageContainer = document.querySelector('.quadra-details>img');

    // Atualizar o container de imagem
    imageContainer.src = image.src;

    // Adicionar a classe .active para o botão clicado
    button.classList.add('active');
}