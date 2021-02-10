const URL_BASE = "http://localhost:3000";

const eliminarVJOnclick = (event) => {
    const vjid = event.target.getAttribute("vjid");
    fetch(`${URL_BASE}/videojuego/${vjid}`, {
        method : "DELETE"
    }).then((resp)=>{
        resp.json().then((data)=>{
            if (data.msg == "") {
                // TODO OK
                cargarVideojuegos();
            }else {
                console.error(data.msg);
            }
        })
    }).catch((error)=>{
        console.error(error);
    })
}

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
    butModificar.setAttribute('class', 'btn btn-link btn-sm');
    butModificar.setAttribute('type', 'button');
    butModificar.innerHTML = "Modificar";

    butEliminar = document.createElement('button')
    butEliminar.setAttribute('class', 'btn btn-link btn-sm');
    butEliminar.setAttribute('type', 'button');
    butEliminar.innerHTML = "Eliminar";
    butEliminar.setAttribute("vjid", videojuego.id);
    butEliminar.addEventListener('click', eliminarVJOnclick);

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
            if (data.msg == "") {
                document.getElementById('videojuegos').innerHTML = "";
                for (var vj of data.data) {
                    const tr = armarFila(vj);
                    document.getElementById('videojuegos').appendChild(tr);
                }
            }
        })
    })
}

// Sea global
var modal;

const main = () => {
    modal = new bootstrap.Modal(document.getElementById('myModal'));
    document.getElementById('butNuevo').addEventListener("click", () => {        
        modal.toggle();
    });
    cargarVideojuegos();
}

window.addEventListener("load", main);