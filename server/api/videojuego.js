const db = require('../dao/models')

const videojuegoAPI = {
    get : (req, res) => {
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
                        consolas : vj.consolas,
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
    },

    post : (req, res) => {
        const vj = req.body;
        
        if (vj.nombre == undefined || 
            vj.consolas == undefined || 
            vj.precio == undefined) {
            const objError = {
                msg : "Debe ingresar todos los valores de videojuego"
            }
            res.status(400).json(objError)
            return;
        }
    
        const vjNuevo = {
            nombre : vj.nombre,
            precio : vj.precio,
            createdAt : new Date(),
            updatedAt : new Date()
        }
    
        // guardar en bd vjNuevo
        db.Videojuego.create(vjNuevo).then((resp) => {
            const objRes = {
                data : resp,
                msg : ""
            }
            res.json(objRes);
        });
    
        
    },

    put : (req, res)=>{
        const vj = req.body;
        const vjId = vj.id;
    
        // Update en la base de datos
        db.Videojuego.update({
            nombre : vj.nombre,
            precio : vj.precio,
            updatedAt : new Date()
        }, {
            where : {
                id : vjId
            }
        }).then((registro) => {
            if (registro != null) {
                const objRes = {
                    data : registro,
                    msg : ""
                }
                res.json(objRes)
            } else {
                const objError = {
                    msg : "No se encontro videojuego con el id enviado"
                }
                res.status(400).json(objError);
            }
        });
    },

    delete : (req, res) => {
        const vjId = req.params.id;
        for (var i=0; i < data.videojuegos.length; i++) {
            const vj = data.videojuegos[i];
            if (vj.id == vjId) {
                // Lo encontramos
                data.videojuegos.splice(i, 1);
                res.json({msg : ""});
                return;
            }
        }
        // No encontramos el id
        res.status(400).json({
            msg : "No se pudo borrar dado que no se encontro el id"
        })
    },

    getAll : (req, res) => {
        // Consulta a la bd
    
        db.Videojuego.findAll().then((usuarios)=>{
            res.send({
                data : usuarios,
                msg : ""
            })
        });
    
    }
}

module.exports = videojuegoAPI;