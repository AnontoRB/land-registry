// Global Map Variable
let map = null;

// Safely initialize OpenStreetMap via Leaflet when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Center default view around Dhaka, Bangladesh
        map = L.map('map').setView([23.8103, 90.4125], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }

    // Enter key listener for plot search
    const plotInput = document.getElementById('plotInput');
    if (plotInput) {
        plotInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchPlot();
            }
        });
    }
});

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
        valuationReason: "Valuation increased due to proximity to commercial highway expansion and complete legal clear-title certification.",
        lat: 23.815,
        lng: 90.415
    }
};

function searchPlot() {
    const inputElement = document.getElementById('plotInput');
    const resultDiv = document.getElementById('resultDetails');
    if (!inputElement || !resultDiv) return;

    const plotId = inputElement.value.trim();
    
    if (!plotId) {
        resultDiv.innerHTML = `<div class="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-sm">Please enter a Plot ID to search.</div>`;
        return;
    }

    const plot = landDatabase[plotId];

    if (plot) {
        // Display formatted result details
        resultDiv.innerHTML = `
            <div class="p-5 bg-slate-50 border-l-4 border-bdGreen rounded shadow-sm">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="text-lg font-bold text-bdGreen">${plot.id}</h3>
                        <p class="text-xs text-gray-500">${plot.location}</p>
                    </div>
                    <span class="text-xs font-semibold bg-green-100 text-bdGreen px-3 py-1 rounded-full">Current Value: ${plot.currentPrice}</span>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700 mb-3">
                    <p><strong>Total Area:</strong> ${plot.area}</p>
                    <p><strong>Current Owner:</strong> ${plot.currentOwner}</p>
                    <p class="sm:col-span-2"><strong>Historical Owners:</strong> ${plot.previousOwners.join(" ➔ ")} ➔ <span class="text-bdGreen font-semibold">${plot.currentOwner}</span></p>
                    <p><strong>Previous Valuation:</strong> ${plot.previousPrice}</p>
                </div>
                
                <div class="bg-white p-3 rounded border border-gray-200 text-xs text-gray-600">
                    <strong class="text-gray-800">Valuation Assessment Note:</strong> ${plot.valuationReason}
                </div>
            </div>
        `;

        // Update Map Marker & Camera Focus
        if (map) {
            map.setView([plot.lat, plot.lng], 16);
            L.marker([plot.lat, plot.lng]).addTo(map)
                .bindPopup(`<b>${plot.id}</b><br>Owner: ${plot.currentOwner}`)
                .openPopup();
        }
    } else {
        resultDiv.innerHTML = `
            <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
                Plot ID "<strong>${plotId}</strong>" was not found in the registry database. Try searching for "<strong>555</strong>".
            </div>`;
    }
}