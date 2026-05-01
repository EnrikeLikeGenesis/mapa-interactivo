let mapaNormal = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
let mapaOscuro = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');

let map = L.map('map', {
    center: [-34.6037, -58.3816],
    zoom: 13,
    layers: [mapaNormal]
});

let baseMaps = {
    "🌍 Normal": mapaNormal,
    "🌑 Oscuro": mapaOscuro
};

L.control.layers(baseMaps).addTo(map);


let puntos = [];
let figura = null;
let marcadores = [];

map.on('click', function (e) {

    let latlng = [e.latlng.lat, e.latlng.lng];
    puntos.push(latlng);

    let marker = L.marker(latlng).addTo(map);
    marcadores.push(marker);

    if (figura) {
        map.removeLayer(figura);
    }

    if (puntos.length === 2) {
        figura = L.polyline(puntos).addTo(map);
    }

    if (puntos.length >= 3) {
        figura = L.polygon(puntos).addTo(map);
    }
});

function limpiarMapa() {

    marcadores.forEach(m => map.removeLayer(m));
    marcadores = [];

    if (figura) {
        map.removeLayer(figura);
        figura = null;
    }

    puntos = [];
}



// calcular la distancia
let puntosDistancia = [];

map.on('click', function(e) {

    // guardar punto
    puntosDistancia.push(e.latlng);

    // si hay 2 puntos → calcular
    if (puntosDistancia.length === 2) {

        let distancia = puntosDistancia[0].distanceTo(puntosDistancia[1]);

        alert("Distancia: " + distancia.toFixed(2) + " metros");

        // resetear para volver a medir
        puntosDistancia = [];
    }

});

