const URL_BASE = "https://ul2077.herokuapp.com";

const modificarVJOnClick = (event) => {
    const vjid = event.target.getAttribute("vjid");
    videojuegoIdGlobal = vjid;
    modal.toggle();
    fetch(`${URL_BASE}/videojuego/${vjid}`, {
        method : 'GET'
    }).then((resp)=> {
        resp.json().then((data) => {
            if (data.msg == "") {
                document.getElementById("vj-nombre").value = data.data.nombre;
                document.getElementById("vj-consolas").value = data.data.consolas;
                document.getElementById("vj-precio").value = data.data.precio;
            }
        });
    }).catch((error) => {
        console.error(error);
    })

};

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
    tdPrecio.innerHTML = videojuego.precio;

    // Mostrar consolas
    var consolasStr = "";
    for (var c of videojuego.consolas) {
        if (consolasStr != "") {
            consolasStr += "," + c.nombre;
        } else {
            consolasStr = c.nombre;
        }
    }
    if (consolasStr == "") consolasStr = "-";
    tdConsolas.innerHTML = consolasStr;


    butModificar = document.createElement('button')
    butModificar.setAttribute('class', 'btn btn-link btn-sm');
    butModificar.setAttribute('type', 'button');
    butModificar.innerHTML = "Modificar";
    butModificar.setAttribute("vjid", videojuego.id);
    butModificar.addEventListener('click', modificarVJOnClick);

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

const cargarCategorias = async () => {
    //1. Consulta al API Rest (/categoria)
    const resp = await fetch(`${URL_BASE}/categoria`, {method:'GET'});
    const data = await resp.json();

    //2. Crear option que se agreguen al select
    const select = document.getElementById('vj-categoria');
    for (var categoria of data.data) {
        const option = document.createElement('option');
        option.setAttribute('value', categoria.id);
        option.innerHTML = categoria.nombre;
        select.appendChild(option);
    }
};

const cargarConsolas = async () => {
    //1. Consulta al API Rest (/consola)
    const resp = await fetch(`${URL_BASE}/consola`, {method:'GET'});
    const data = await resp.json();

    //2. Crear option que se agreguen al select
    const select = document.getElementById('vj-consolas');
    for (var consola of data.data) {
        const option = document.createElement('option');
        option.setAttribute('value', consola.id);
        option.innerHTML = consola.nombre;
        select.appendChild(option);
    }
};

const limpiarFormulario = () => {
    document.getElementById('vj-nombre').value = "";
    document.getElementById('vj-consolas').value = "";
    document.getElementById('vj-precio').value = "";
}

const butGuardarOnClick = () => {
    const vjNombre = document.getElementById('vj-nombre').value;
    const vjConsolas = document.getElementById('vj-consolas').selectedOptions;
    const vjPrecio = document.getElementById('vj-precio').value;
    const vjCategoriaId = document.getElementById('vj-categoria').value;

    var body;
    var tipoPeticion;

    const consolas = [];
    for (var optConsola of vjConsolas) {
        const consolaId = optConsola.getAttribute("value");
        consolas.push(consolaId);
    }

    if (videojuegoIdGlobal == null) {
        // Registro de un nuevo recurso
        body = {
            nombre : vjNombre,
            consolas : consolas,
            precio : vjPrecio,
            categoriaId : vjCategoriaId
        }
        tipoPeticion = 'POST';
    }else {
        // Modificacion de un recurso existente
        body = {
            id : videojuegoIdGlobal,
            nombre : vjNombre,
            consolas : consolas,
            precio : vjPrecio,
            categoriaId : vjCategoriaId
        }
        tipoPeticion = 'PUT';
    }


    fetch(`${URL_BASE}/videojuego`, {
        method : tipoPeticion,
        body : JSON.stringify(body),
        headers : {
            "Content-Type" : "application/json"
        }
    }).then((resp) => {
        resp.json().then((data)=> {
            if (data.msg == "") {
                // Todo correcto
                console.log(data.data);
                modal.hide();
                limpiarFormulario();
                cargarVideojuegos();
                videojuegoIdGlobal = null;
            }else {
                // Error
                console.error(data.msg);
            }
        })
    })
}

// Sea global
var modal;
var videojuegoIdGlobal = null;

const main = () => {
    modal = new bootstrap.Modal(document.getElementById('myModal'));

    document.getElementById('butNuevo').addEventListener("click", () => {        
        modal.toggle();
    });

    document.getElementById('butGuardar').addEventListener('click', butGuardarOnClick);

    cargarVideojuegos();
    cargarCategorias();
    cargarConsolas();
}

window.addEventListener("load", main);