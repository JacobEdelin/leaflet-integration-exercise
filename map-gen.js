function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

// Sets map view to the United States
var map = L.map('map').setView([39.82, -98.58], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Gets 3 random latitudes and longitudes given the parameters
var markers = [];
for (let i = 1; i <= 3; i++) {
    var lat = getRandomInRange(30, 35, 3);
    var long = getRandomInRange(-90, -100, 3);
    var marker = L.marker([lat, long]).addTo(map);
    markers.push(marker);

    // Displays the coordinates in the HTML file
    var randomLat = document.getElementById(`lat${i}`);
    var randomLong = document.getElementById(`long${i}`);
    
    randomLat.textContent = lat;
    randomLong.textContent = long;
    
    // Fetches the locality for each set of coordinates
    var url = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+lat+"&longitude="+long+"&localityLanguage=en"
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            var locality = res.locality;
            var randomLocality = document.getElementById(`locality${i}`);
            randomLocality.textContent = locality;
        });
    }