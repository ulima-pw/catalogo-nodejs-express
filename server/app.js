const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');

const app = express();
const PORT = 3000;



app.use(express.static('public'));
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
app.get('/videojuego/:id', (req, res) => {
    // Buscar el videojuego con el id enviado y devolverlo
    const vjId = req.params.id;
    const videojuegos = data.videojuegos;
    for (var vj of videojuegos) {
        if (vj.id == vjId) {
            // Encontre el vj y debo devolverlo
            const objRes = {
                data : {
                    id : vj.id,
                    nombre : vj.nombre,
                    precio : vj.precio
                },
                msg : ""
            }
            res.json(objRes);
            return;
        }
    }
    // Devolver algun mensaje de error
    const objResError = {
        msg : "No existe un recurso con ese id"
    }
    res.status(400).json(objResError);
})


app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});