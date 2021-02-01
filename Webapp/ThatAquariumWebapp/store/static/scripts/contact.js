// Edit here for future branches
// Branch Name, Address, Telephone, Operating Hourse, Coordinates in Array, Icon File
var branches = [
    ["Yishun Branch", "Blk 618 Yishun Ring Road, #01-3236 Singapore 760618", "6758 5488", "10.30am - 10pm Daily", [1.4187395,103.8355375], "place-red-24px.png"],
    ["Changi Branch", "284 Changi Road, Singapore 419763", "9780 1839", "9.30am - 9pm Daily", [1.3176502,103.9065070], "place-blue-24px.png"],
    ["Clementi Branch", "Blk 328 Clementi Avenue 2, #01-198, Singapore 120328", "9170 5488", "10.30am - 10pm Daily", [1.3134847,103.7669829], "place-green-24px.png"],
    ["Tampines Branch", "Blk 929 Tampines Street 91, #01-447, Singapore 520929", "*Currently Under Construction*", "*ETA: To be Determined*", [1.3463011,103.9394945], "place-orange-24px.png"],
];

//No need to touch the following
var osm_map = L.map('osm-map').setView([1.3521, 103.8198], 11);
var markers = [];

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=9e3RTU9WPO31TSDgGzfQ',{
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    crossOrigin: true
}).addTo(osm_map);

$(document).ready(function() {
    for (let i = 0; i < branches.length; i++) {
        var iconPins = new L.icon({
            iconUrl: `../../static/images/Contact Us/${branches[i][5]}`,
            iconSize: [32, 32],
            iconAnchor: [12, 41],
        });
        markers = [...markers, L.marker(branches[i][4], {icon: iconPins}).addTo(osm_map)];
        $(".branches").append(`
            <div class="flex-r branch-specific branch-specific-${i + 1}">
                <img src = "../../static/images/Contact Us/${branches[i][5]}" class = "pins-right">
                <div>
                    <p class = "location-texts branch-name"><u>${branches[i][0]}</u></p>
                    <p class = "location-texts address-main">${branches[i][1]}</p>
                    <p class = "location-texts phone-number">${branches[i][2]}</p>
                    <p class = "location-texts operating-hours">${branches[i][3]}</p>
                </div>
            </div>
        `);
        if (i + 1 == branches.length) {
            $(`.branch-specific-${i + 1}`).addClass("branch-specific-last");
        };
    };
    $(".branch-specific").click(function() {
        number = parseInt($(this).attr("class").split(" ")[2].slice(-1));
        osm_map.setView(branches[number - 1][4], 15);
    });
});