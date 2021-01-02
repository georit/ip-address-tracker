// leafletjs
function showLocationOnMap(lat, long) {
  const mymap = L.map("map-container").setView([lat, long], 13);
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
  var marker = L.marker([lat, long]).addTo(mymap);
}

/* *****variables***** */
const apiUrl = "https://geo.ipify.org/api/v1";
const apiKey = "at_T7GiW5hZVporHHMx7FuVacJ5HVq7S";
const form = document.getElementById("ip-address-form");
const inputField = document.getElementById("ip-address-input");
const ipAddress = document.getElementById("ip-address");
const ipLocation = document.getElementById("location");
const ipTimezone = document.getElementById("timezone");
const ipIsp = document.getElementById("isp");

/* *****on load***** */
// display user ip address info
getLocation("");

/* *****functions***** */
async function getLocation(input) {
  try {
    let resp;
    if (isIpAddress(input)) {
      resp = await fetch(`${apiUrl}?apiKey=${apiKey}&ipAddress=${input}`);
    } else {
      resp = await fetch(`${apiUrl}?apiKey=${apiKey}&domain=${input}`);
    }

    const data = await resp.json();
    displayResults(data);
  } catch (error) {
    console.log(error);
  }
}

function isIpAddress(input) {
  const reIpv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const reIpv6 =
    "(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))";

  return input.match(reIpv4) || input.match(reIpv6) ? true : false;
}

function displayResults(data) {
  // ip address
  elementContents(ipAddress, `${data.ip}`);

  // location
  elementContents(
    ipLocation,
    `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
  );

  // timezone
  elementContents(ipTimezone, `${data.location.timezone}`);

  // isp
  elementContents(ipIsp, `${data.isp}`);

  //map
  createMapElement();

  // show location on map
  showLocationOnMap(data.location.lat, data.location.lng);
}

function elementContents(element, content) {
  if (content === undefined) {
    element.innerHTML = "";
  } else {
    element.innerHTML = content;
  }
}

function createMapElement() {
  let mapEl = document.createElement("div");
  mapEl.className = "map-container";
  mapEl.setAttribute("id", "map-container");
  document.body.appendChild(mapEl);
}

function destroyMapElement() {
  document.getElementById("map-container").remove();
}

/* *****event listeners***** */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputField.value !== "") {
    destroyMapElement();
    getLocation(inputField.value);
  }
});
