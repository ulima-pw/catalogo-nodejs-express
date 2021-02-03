// function main() {

// }

// var main = function() {

// }

// var listaImagenes = [
//     {
//         nombre : "Cyberpunk 2077",
//         imagen : "/imagenes/imagen.jpg"
//     },
//     {
//         nombre : "Red Dead Redemption 2",
//         imagen : "https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/RCVN57YFWFBNBJO3VM4IS3ZO3U.jpg"
//     },
//     {
//         nombre : "Scott Pilgrim vs The World",
//         imagen : "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_ScottPilgrimVsTheWorldTheGameCompleteEdition_image1600w.jpg"
//     }
// ];
var listaImagenes;
var contador = 1;
const URL_BASE = "http://localhost:3000";

var elegirImagen = () => {
    const urlImagen = listaImagenes[contador % 3].imagen;
    document.getElementById('banner').setAttribute("src", urlImagen);
    contador++;
};

// Callback de fetch
var cargarImagenesOK = (respData) => {
    respData.json().then((data) => {
        // data es lo que nos devuelve el servidor
        listaImagenes = data;
    });
}

// Callback de fetch
var cargarImagenesError = (error) => {
    console.error(error);
}

var cargarImagenes = () => {
    // comienza la conexion remota
    const promesa = fetch(
        `${URL_BASE}/banner`,
        {
            method : 'GET'
        }
    )
    promesa.then(cargarImagenesOK); // se va a ejecutar si no hubo errores
    promesa.catch(cargarImagenesError); // se va a ejecutar si hubo un error
}

const crearOption = (id, nombre) => {
    const option = document.createElement('option');
    option.setAttribute("value", id);
    option.innerHTML = nombre;
    return option;
}

const cargarPaises = () => {
    fetch(`${URL_BASE}/paises`, 
    {
        method : 'GET'
    }).then((respuesta)=>{
        respuesta.json().then((data) => {
            // Manejar la data que envia el servidor
            const select = document.getElementById('pais');
            for (var i=0; i < data.length; i++) {
                const option = crearOption(data[i].id, data[i].nombre)
                select.appendChild(option);
            }
            
        })
    }).catch((error)=>{
        console.error(error);
    });
}

var main = () => {
    cargarImagenes();
    cargarPaises();
    window.setInterval(elegirImagen, 4000);
};

window.addEventListener("load", main);