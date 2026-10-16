// Initialize OpenStreetMap via Leaflet
const map = L.map('map').setView([23.8103, 90.4125], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Simulated database of land plots
const landDatabase = {
    "555": {
        id: "Plot #555",
        location: "Savar, Dhaka Division",
        area: "555 sq meters",
        currentOwner: "Anonto Raj",
        previousOwners: ["Rahim Uddin", "Karim Ahmed"],
        currentPrice: "$50,000",
        previousPrice: "$42,000",
        valuationReason: "Price is high because it is close to a newly developed commercial highway and has clean legal titles.",
        lat: 23.815,
        lng: 90.415
    }
};

function searchPlot() {
    const plotId = document.getElementById('plotInput').value.trim();
    const resultDiv = document.getElementById('resultDetails');
    
    const plot = landDatabase[plotId];

    if (plot) {
        // Display details on the webpage
        resultDiv.innerHTML = `
            <div class="mt-4 p-4 bg-gray-50 border rounded">
                <h2 class="text-xl font-bold text-blue-700">${plot.id}</h2>
                <p><strong>Location:</strong> ${plot.location}</p>
                <p><strong>Area:</strong> ${plot.area}</p>
                <p><strong>Current Owner:</strong> ${plot.currentOwner}</p>
                <p><strong>Previous Owners:</strong> ${plot.previousOwners.join(" ➔ ")}</p>
                <p><strong>Current Price:</strong> ${plot.currentPrice} (Previous: ${plot.previousPrice})</p>
                <p class="mt-2 text-sm text-gray-700"><strong>Valuation Note:</strong> ${plot.valuationReason}</p>
            </div>
        `;

        // Update Map Marker
        map.setView([plot.lat, plot.lng], 16);
        L.marker([plot.lat, plot.lng]).addTo(map)
            .bindPopup(`<b>${plot.id}</b><br>Owner: ${plot.currentOwner}`)
            .openPopup();
    } else {
        resultDiv.innerHTML = `<p class="mt-4 text-red-600">Plot not found. Try searching for "555".</p>`;
    }
}