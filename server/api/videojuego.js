const db = require('../dao/models')

const videojuegoAPI = {
    get : (req, res) => {
        // Buscar el videojuego con el id enviado y devolverlo
        const vjId = req.params.id;

        db.Videojuego.findAll({
            where : {
                id : vjId
            }
        }).then((videojuegos)=>{
            if (videojuegos[0] != null) {
                const objRes = {
                    data : {
                        id : videojuegos[0].id,
                        nombre : videojuegos[0].nombre,
                        consolas : "-",
                        precio : videojuegos[0].precio
                    },
                    msg : ""
                }
                res.json(objRes);
            }else {
                // Devolver algun mensaje de error
                const objResError = {
                    msg : "No existe un recurso con ese id"
                }
                res.status(400).json(objResError);
            }
        });
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

        db.Videojuego.destroy({
           where : {
               id : vjId
           } 
        }).then((any) => {
            res.json({msg : ""});
        });
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