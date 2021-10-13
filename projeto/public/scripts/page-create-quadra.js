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
    iconAnchor: [29, 68]
});

let marker;

// Cria e adiciona marcadores no mapa
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // Remove ícone
    marker && map.removeLayer(marker);

    // Adiciona ícone
    marker = L.marker([lat, lng], { icon }).addTo(map);
});

// Adicionar o campo de fotos
function addPhotoField() {
    // Seleciona container de fotos
    const container = document.querySelector('#images');

    // Seleciona container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload');

    // Realizar o clone da última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);

    // Verificar se o campo está vazio, se sim não adicionar ao container de imagens
    const input = newFieldContainer.children[0];

    if (input.value == '') {
        return;
    }

    // Limpar o campos antes de adicionar ao container de imagens
    input.value = '';

    // Adicionar o clone ao container #images
    container.appendChild(newFieldContainer);
}

function deleteField(event) {
    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload');

    if (fieldsContainer.length < 2) {
        // Limpar o valor do campo
        span.parentNode.children[0].value = '';
        return;
    }

    // Deletar o campo
    span.parentNode.remove();
}

// Selecionar sim ou não
function toggleSelect(event) {
    // Retirar a classe .active dos botões
    document.querySelectorAll('.button-select button').forEach(
        function (button) {
            button.classList.remove('active')
        }
    );

    // Colocar a classe .active no botão clicado
    const button = event.currentTarget;
    button.classList.add('active');

    // Atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]');

    // Verificar se é sim ou não
    input.value = button.dataset.value;
}