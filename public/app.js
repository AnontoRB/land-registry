// Global Map Variable
let map = null;

// Safely initialize OpenStreetMap via Leaflet when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Center default view around Savar/Dhaka, Bangladesh
        map = L.map('map').setView([23.815, 90.415], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© LandTech 2026 DIU Team | OpenStreetMap contributors'
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

// Hackathon Mock Database with Advanced Fields (P2 & P5 compliance)
const landDatabase = {
    "555": {
        id: "Plot #555",
        location: "Savar Upazila, Dhaka Division",
        mouza: "Savar Mouza-42",
        khatianNo: "CS-204 / RS-512",
        area: "555 sq meters (approx 8 Katha)",
        currentOwner: "Anonto Raj",
        previousOwners: ["Rahim Uddin", "Karim Ahmed"],
        currentPrice: "BDT 5,500,000",
        previousPrice: "BDT 4,800,000",
        valuationReason: "High valuation driven by direct frontage on newly expanded commercial highway and completed electronic mutation clearance.",
        legalStatus: "No Pending Court Cases (Clean Title)",
        khasOrAcquisition: "Not Khas | Free from Government Acquisition Orders",
        cryptographicHash: "0x8f4c2b9a71d3e6f809123456789abcdef0123456",
        qrStatus: "Verified Authentic (Digital Signature Valid)",
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
        resultDiv.innerHTML = `<div class="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-sm">Please enter a Plot ID to verify.</div>`;
        return;
    }

    const plot = landDatabase[plotId];

    if (plot) {
        // Display comprehensive LandTech verification report
        resultDiv.innerHTML = `
            <div class="p-6 bg-slate-50 border-l-4 border-bdGreen rounded shadow-sm space-y-4">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 gap-2">
                    <div>
                        <h3 class="text-xl font-bold text-bdGreen">${plot.id}</h3>
                        <p class="text-xs text-gray-600">${plot.location} | Mouza: ${plot.mouza} | Khatian: ${plot.khatianNo}</p>
                    </div>
                    <span class="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200">
                        🛡️ ${plot.qrStatus}
                    </span>
                </div>
                
                <!-- Core Details Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700 bg-white p-4 rounded border">
                    <p><strong>Total Area:</strong> ${plot.area}</p>
                    <p><strong>Current Owner:</strong> ${plot.currentOwner}</p>
                    <p><strong>Chain of Ownership:</strong> ${plot.previousOwners.join(" ➔ ")} ➔ <span class="text-bdGreen font-bold">${plot.currentOwner}</span></p>
                    <p><strong>Current Market Value:</strong> ${plot.currentPrice} (Prev: ${plot.previousPrice})</p>
                </div>

                <!-- LandTech Safety & Legal Audit (P5) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div class="bg-green-50 border border-green-200 p-3 rounded">
                        <strong class="text-green-900 block mb-1">⚖️ Legal & Court Status:</strong>
                        <span class="text-green-700 font-medium">${plot.legalStatus}</span>
                    </div>
                    <div class="bg-blue-50 border border-blue-200 p-3 rounded">
                        <strong class="text-blue-900 block mb-1">🏛️ Government Status:</strong>
                        <span class="text-blue-700 font-medium">${plot.khasOrAcquisition}</span>
                    </div>
                </div>
                
                <!-- Valuation & Cryptographic Hash (P2) -->
                <div class="space-y-2 text-xs">
                    <div class="bg-white p-3 rounded border border-gray-200">
                        <strong class="text-gray-800 block mb-1">📈 Price Valuation Reason:</strong>
                        <p class="text-gray-600">${plot.valuationReason}</p>
                    </div>
                    <div class="bg-slate-900 text-emerald-400 p-3 rounded font-mono text-[11px] flex justify-between items-center overflow-x-auto">
                        <span><strong>Deed SHA-256 Hash:</strong> ${plot.cryptographicHash}</span>
                        <span class="bg-emerald-800 text-white px-2 py-0.5 rounded text-[10px]">SECURE</span>
                    </div>
                </div>
            </div>
        `;

        // Update Map Marker & Camera Focus
        if (map) {
            map.setView([plot.lat, plot.lng], 16);
            L.marker([plot.lat, plot.lng]).addTo(map)
                .bindPopup(`<b>${plot.id}</b><br>Owner: ${plot.currentOwner}<br><span style="color:green;">✔ Verified Title</span>`)
                .openPopup();
        }
    } else {
        resultDiv.innerHTML = `
            <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
                Plot ID "<strong>${plotId}</strong>" was not found in the dummy registry database. Try searching for plot ID "<strong>555</strong>".
            </div>`;
    }
}