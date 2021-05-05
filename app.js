"use strict";
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
const zoom = 3;
const myIcon = L.icon({
  iconUrl: "iss.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const map = L.map("mapid").setView([0, 0], 3);
const marker = L.marker([0, 0], { icon: myIcon }).addTo(map);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

async function getISSData() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude } = data;
  console.log(`latitude : ${latitude} and longitude : ${longitude}`);
  marker.setLatLng([latitude, longitude]);
  map.setView([latitude, longitude]);
  document.getElementById("lat").textContent = latitude;
  document.getElementById("lng").textContent = longitude;
}
getISSData();
setInterval(getISSData, 1000);
