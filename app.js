const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');

const app = express();
const PORT = 3000;



app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended : true
}))

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


app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});