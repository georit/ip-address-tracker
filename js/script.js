// leafletjs
const mymap = L.map("map-container").setView([51.505, -0.09], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidG9iaWFzbXVucm9lIiwiYSI6ImNramVrdzVuaDBicWgycnRnNnI3ZnJ4eHgifQ.YFPUrWGvyJm-dRRLhFRo-A",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoidG9iaWFzbXVucm9lIiwiYSI6ImNramVrdzVuaDBicWgycnRnNnI3ZnJ4eHgifQ.YFPUrWGvyJm-dRRLhFRo-A",
  }
).addTo(mymap);
var marker = L.marker([51.5, -0.09]).addTo(mymap);
