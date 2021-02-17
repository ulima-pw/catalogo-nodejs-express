const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');

const app = express();
const PORT = 3000;

const videojuegoAPI = require('./api/videojuego')


app.use(express.static('public'));
app.use(bodyParser.json()) // para deserializacion automatica
app.use(bodyParser.urlencoded({
    extended : true
}))

app.set('view engine', 'ejs');

// Endpoint
app.get('/banner', (req, res) => {
    res.send(JSON.stringify(data.imagenes));
});

// Endpoint de registro de usuarios
app.post('/usuarios-registrar', (req, res) => {
    const usuario = {
        nombre : req.body.nombre,
        pais: req.body.pais,
        email : req.body.email,
        mensaje : req.body.mensaje
    }

    data.usuarios.push(usuario);

    res.send("<h1>Exito!</h1><a href='/index.html'>Regresar</a>");
})

// Endpoint que retorna usuarios 
app.get('/usuarios', (req, res) => {
    res.send(JSON.stringify(data.usuarios));
})

// Endpoint que retorna paises
app.get('/paises' , (req, res) => {
    res.send(JSON.stringify(data.paises))
})

// Endpoint mostrar el formulario login
app.get('/login', (req, res) => {
    // Llamando al motor de templates diciendo que cree un html
    // en base al template login.ejs y luego el resultado se
    // devuelve al cliente.
    res.render('login', {
        error : false
    });
})

// Endpoint procesar el formulario para ver si login se acepta
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username == "pw" && password == "123") {
        // Login correcto
        res.redirect('/catalogo')
    } else {
        // Login incorrecto
        res.render('login', {
            error : true
        })
    }
})

// endpoint mostrar la lista de videojuegos
app.get('/catalogo', (req, res)=>{
    const listaVideojuegos = data.videojuegos;
    res.render('catalogo', {
        videojuegos : listaVideojuegos
    });
})

// API REST
// Recurso: Videojuego
// 1. GET: Obtener un videojuego
app.get('/videojuego/:id', videojuegoAPI.get);

// 2. POST: Registrar un videojuego
// {
//     "nombre" : "",
//     "consolas" : "",
//     "precio" : 12
// }
app.post('/videojuego', videojuegoAPI.post);

// 3. PUT: Modificar un videojuego existente
// {
//     "id" : 2,
//     "nombre" : "",
//     "consolas" : "",
//     "precio" : 12
// }
app.put('/videojuego', videojuegoAPI.put);

// 4. DELETE: Eliminar un videojuego existente
app.delete('/videojuego/:id', videojuegoAPI.delete);

// 5. GET: Devolver una lista de videojuegos
app.get('/videojuego', videojuegoAPI.getAll);


app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});