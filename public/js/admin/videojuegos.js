const URL_BASE = "http://localhost:3000";

const armarFila = (videojuego) => {
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdNombre = document.createElement('td');
    const tdConsolas = document.createElement('td');
    const tdPrecio = document.createElement('td');
    const tdAcciones = document.createElement('td');

    tdId.innerHTML = videojuego.id;
    tdNombre.innerHTML = videojuego.nombre;
    tdConsolas.innerHTML = videojuego.consolas;
    tdPrecio.innerHTML = videojuego.precio;

    butModificar = document.createElement('button')
    butModificar.setAttribute('class', 'btn btn-primary btn-sm disabled');
    butModificar.setAttribute('type', 'button');
    butModificar.innerHTML = "M";

    butEliminar = document.createElement('button')
    butEliminar.setAttribute('class', 'btn btn-primary btn-sm');
    butEliminar.setAttribute('type', 'button');
    butEliminar.innerHTML = "E";

    tdAcciones.appendChild(butModificar);
    tdAcciones.appendChild(butEliminar);

    tr.appendChild(tdId);
    tr.appendChild(tdNombre);
    tr.appendChild(tdConsolas);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdAcciones);

    return tr;
}

const cargarVideojuegos = () => {
    fetch(`${URL_BASE}/videojuego`, {
        method : "GET"
    }).then( (res) => {
        res.json().then((data)=> {
            console.log(data);
            if (data.msg == "") {
                for (var vj of data.data) {
                    const tr = armarFila(vj);
                    document.getElementById('videojuegos').appendChild(tr);
                }
            }
        })
    })
}

const main = () => {
    cargarVideojuegos();
}

window.addEventListener("load", main);