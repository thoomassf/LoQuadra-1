// Mapa
const map = L.map('mapid').setView([-23.5613462, -46.6586759], 15);

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

function addMarker({ id, name, lat, lng }) {
    // Cria pop-up
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name} <a href="/quadra?id=${id}"><img src="/images/arrow-white.svg"></a>`);

    // Pop-up no mapa
    L.marker([lat, lng], { icon }).addTo(map).bindPopup(popup);
}

const quadrasSpan = document.querySelectorAll('.quadras span');
quadrasSpan.forEach(span => {
    const quadra = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
    }

    addMarker(quadra);
});