// Initialize OpenStreetMap via Leaflet
const map = L.map('map').setView([23.8103, 90.4125], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Dummy search function for Plot #555
function searchPlot() {
    const plotId = document.getElementById('plotInput').value.trim();
    
    if (plotId === '555') {
        alert('Plot #555 Found!\nOwner: John Doe\nArea: 555 sq meters\nPrice: $50,000');
        map.setView([23.815, 90.415], 16);
        L.marker([23.815, 90.415]).addTo(map)
            .bindPopup('<b>Plot #555</b><br>Owner: John Doe<br>Area: 555 sq m')
            .openPopup();
    } else {
        alert('Plot not found. Try searching for "555".');
    }
}