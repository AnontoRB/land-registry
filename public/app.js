// Global Map Variable
let map = null;

// Comprehensive Hackathon Mock Database (P1, P2, P3, P5 compliance)
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
    },
    "120": {
        id: "Plot #120",
        location: "Uttara Sector 4, Dhaka",
        mouza: "Uttara Mouza-12",
        khatianNo: "RS-102 / BS-304",
        area: "300 sq meters (approx 4.5 Katha)",
        currentOwner: "Anonto Raj",
        previousOwners: ["Abdul Jabbar"],
        currentPrice: "BDT 4,200,000",
        previousPrice: "BDT 3,900,000",
        valuationReason: "Urban residential zone with verified electronic mutation status and municipal utility access.",
        legalStatus: "No Pending Court Cases (Clean Title)",
        khasOrAcquisition: "Not Khas | Free from Government Acquisition Orders",
        cryptographicHash: "0x3b2a1f9e87d6c5b40123456789abcdef9876543",
        qrStatus: "Verified Authentic (Digital Signature Valid)",
        lat: 23.873,
        lng: 90.398
    },
    "404": {
        id: "Plot #404",
        location: "Dhanmondi, Dhaka",
        mouza: "Dhanmondi Mouza-09",
        khatianNo: "CS-88 / RS-99",
        area: "400 sq meters",
        currentOwner: "Tanvir Ahmed",
        previousOwners: ["Rafiqul Islam"],
        currentPrice: "BDT 12,000,000",
        previousPrice: "BDT 11,500,000",
        valuationReason: "Prime commercial and residential hub.",
        legalStatus: "⚠️ Active Title Dispute in Joint District Judge Court",
        khasOrAcquisition: "Under Government Scrutiny",
        cryptographicHash: "0xdeadbeef1234567890abcdef1234567890abcdef",
        qrStatus: "Flagged: Potential Overlapping Claim",
        lat: 23.746,
        lng: 90.376
    }
};

// Initialize Leaflet Map on DOM Load
document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        map = L.map('map').setView([23.815, 90.415], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© LandTech 2026 DIU Team | OpenStreetMap contributors'
        }).addTo(map);

        // Add pins for all database plots automatically for dynamic feel
        Object.values(landDatabase).forEach(plot => {
            L.marker([plot.lat, plot.lng]).addTo(map)
                .bindPopup(`<b>${plot.id}</b><br>Owner: ${plot.currentOwner}<br><a href="#" onclick="document.getElementById('plotInput').value='${plot.id.replace('Plot #', '')}'; searchPlot();">Inspect Plot</a>`);
        });
    }

    const plotInput = document.getElementById('plotInput');
    if (plotInput) {
        plotInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') searchPlot();
        });
    }
});

function searchPlot() {
    const inputElement = document.getElementById('plotInput');
    const resultDiv = document.getElementById('resultDetails');
    if (!inputElement || !resultDiv) return;

    const plotId = inputElement.value.trim().replace('Plot #', '');
    
    if (!plotId) {
        resultDiv.innerHTML = `<div class="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-sm">⚠️ Please enter a Plot ID to verify. (Try: 555, 120, or 404)</div>`;
        return;
    }

    const plot = landDatabase[plotId];

    if (plot) {
        resultDiv.innerHTML = `
            <div class="p-6 bg-slate-50 border-l-4 border-bdGreen rounded shadow-sm space-y-4 animate-fade-in">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 gap-2">
                    <div>
                        <h3 class="text-xl font-bold text-bdGreen">${plot.id}</h3>
                        <p class="text-xs text-gray-600">${plot.location} | Mouza: ${plot.mouza} | Khatian: ${plot.khatianNo}</p>
                    </div>
                    <span class="text-xs font-bold px-3 py-1.5 rounded-full border ${plot.qrStatus.includes('Flagged') ? 'bg-red-100 text-red-800 border-red-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'}">
                        🛡️ ${plot.qrStatus}
                    </span>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700 bg-white p-4 rounded border">
                    <p><strong>Total Area:</strong> ${plot.area}</p>
                    <p><strong>Current Owner:</strong> ${plot.currentOwner}</p>
                    <p><strong>Chain of Ownership:</strong> ${plot.previousOwners.join(" ➔ ")} ➔ <span class="text-bdGreen font-bold">${plot.currentOwner}</span></p>
                    <p><strong>Current Market Value:</strong> ${plot.currentPrice} (Prev: ${plot.previousPrice})</p>
                </div>

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

        if (map) {
            map.setView([plot.lat, plot.lng], 16);
            L.marker([plot.lat, plot.lng]).addTo(map)
                .bindPopup(`<b>${plot.id}</b><br>Owner: ${plot.currentOwner}`)
                .openPopup();
        }
    } else {
        resultDiv.innerHTML = `
            <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
                ❌ Plot ID "<strong>${plotId}</strong>" was not found in the dummy registry database. Try searching for plot ID "<strong>555</strong>" or "<strong>404</strong>".
            </div>`;
    }
}

function searchByOwner() {
    const inputVal = document.getElementById('ownerInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('ownerResults');

    if (!inputVal) {
        resultDiv.innerHTML = `<div class="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-sm">⚠️ Please enter an owner name to search (e.g., Anonto Raj).</div>`;
        return;
    }

    // Dynamic search filtering across all mock entries
    const matchedPlots = Object.values(landDatabase).filter(p => p.currentOwner.toLowerCase().includes(inputVal));

    if (matchedPlots.length > 0) {
        let html = `
            <div class="bg-white p-6 rounded-lg shadow-sm border border-green-200 animate-fade-in">
                <h3 class="font-bold text-lg mb-4 text-bdGreen flex items-center gap-2">
                    <span>📋</span> Registered Properties Matching "${inputVal}"
                </h3>
                <div class="space-y-3">`;
        
        matchedPlots.forEach(r => {
            html += `
                <div class="p-4 border-l-4 border-bdGreen bg-slate-50 rounded shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                        <h4 class="font-bold text-gray-800 text-sm">${r.id} (${r.location})</h4>
                        <p class="text-xs text-gray-600">Mouza: ${r.mouza} | Area: ${r.area}</p>
                    </div>
                    <div class="text-right">
                        <span class="text-xs font-semibold bg-green-100 text-bdGreen px-3 py-1 rounded-full block mb-1">Value: ${r.currentPrice}</span>
                        <span class="text-[10px] text-emerald-700 font-bold">${r.qrStatus}</span>
                    </div>
                </div>`;
        });
        html += `</div></div>`;
        resultDiv.innerHTML = html;
    } else {
        resultDiv.innerHTML = `
            <div class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm">
                ❌ No property records found for "<strong>${inputVal}</strong>". Try searching for "<strong>Anonto Raj</strong>".
            </div>`;
    }
}