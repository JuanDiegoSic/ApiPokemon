//url Api
const API = "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0";

//Obtener los resultados de la API
const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      pokeData(json.results),
      paginacion(json);

    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

// const pokedata

const pokeData = (data) => {
let html = "";
document.getElementById("datosPersonajes").innerHTML = "";
data.forEach((pj) => {
  const URL = pj.url;
  return fetch(URL)
   .then((response) => response.json())
   .then((json) => {
    llenarDatos(json, html);
   })
   .catch((error) => {
    console.log("Error: ", error);
  });
});

}

// Dibujar cards de personajes
const llenarDatos = (data,html) => {


  html += '<div class="col mt-5">';
  html += '<div class="card" style="width: 10rem;">';
  html += `<img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="${data.name}"></img>`;
  html += '<div class="card-body">';
  html += `<h5 class="card-title">${data.name}</h5>`;
  html += `<p class="card-text">Status: ${data.weight}</p>`;
  html += `<p class="card-text">Specie: ${data.height}</p>`;
  html += "</div>";
  html += "</div>";
  html += "</div>";

  document.getElementById("datosPersonajes").innerHTML += html;
};

//Paginacion
const paginacion = (data) => {
  let prevDisabled = "";
  let nextDisabled = "";

  console.log(data.previous);

  let html = `<li class="page-item ${
    data.previous == null ? (prevDisabled = "disabled") : (prevDisabled = "")
  }"><a class="page-link" onclick="getData('${data.previous}')"> Previous </a></li> <li class="page-item ${
    data.next == null ? (nextDisabled = "disabled") : (nextDisabled = "")
  }"><a class="page-link" onclick="getData('${data.next}')"> Next </a></li>`;

  document.getElementById("paginacion").innerHTML = html;
};

// Se ejecuta la  API
getData(API);
