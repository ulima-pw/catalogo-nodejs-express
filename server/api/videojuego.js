const db = require('../dao/models')

const videojuegoAPI = {
    get : async (req, res) => {
        // Buscar el videojuego con el id enviado y devolverlo
        const vjId = req.params.id;

        const videojuegos = await db.Videojuego.findAll({
            where : {
                id : vjId
            }
        })

        if (videojuegos[0] != null) {
            const videojuego = videojuegos[0];
            const consolas = await videojuego.getConsolas();

            const objRes = {
                data : {
                    id : videojuegos[0].id,
                    nombre : videojuegos[0].nombre,
                    categoriaId : videojuegos[0].categoriaId,
                    consolas : consolas,
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
    },

    post : async (req, res) => {
        const vj = req.body;
        
        if (vj.nombre == undefined || 
            vj.consolas.length == 0 || 
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
            categoriaId : vj.categoriaId,
            createdAt : new Date(),
            updatedAt : new Date()
        }
    
        // guardar en bd vjNuevo
        const vjGuardado = await db.Videojuego.create(vjNuevo);

        for (var consolaId of vj.consolas) {
            // Obtenemos una consola con el id entregado
            const consola = await db.Consola.findAll({
                where : {
                    id : consolaId
                }
            })
            // Registramos relacion con vj
            await vjGuardado.addConsola(consola);
        }

        

        // Registrar las consolas de ese videojuego

        const objRes = {
            data : vjGuardado,
            msg : ""
        }
        res.json(objRes);
    },

    put : async (req, res)=>{
        const vj = req.body;
        const vjId = vj.id;
    
        // Update en la base de datos
        // TODO: Falta guardar la categoriaId y las consolas
        const registro = await db.Videojuego.update({
            nombre : vj.nombre,
            precio : vj.precio,
            categoriaId : vj.categoriaId,
            updatedAt : new Date()
        }, {
            where : {
                id : vjId
            }
        });

        const videojuegos = await db.Videojuego.findAll({
            where : {
                id : vjId
            }
        });
        const videoJuegoModificado = videojuegos[0];

        // Borramos todas las consolas existentes
        const consolasParaBorrar = await videoJuegoModificado.getConsolas();
        await videoJuegoModificado.removeConsolas(consolasParaBorrar);

        // Agregamos las consolas entregadas
        for (var consolaId of vj.consolas) {
            const consolas = await db.Consola.findAll({
                where : {
                    id : consolaId
                }
            });
            const consola = consolas[0];
            await videoJuegoModificado.addConsola(consola);
        }


        if (videoJuegoModificado != null) {
            const objRes = {
                data : videoJuegoModificado,
                msg : ""
            }
            res.json(objRes)
        } else {
            const objError = {
                msg : "No se encontro videojuego con el id enviado"
            }
            res.status(400).json(objError);
        }
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

    getAll : async (req, res) => {
        // Consulta a la bd
    
        const videojuegos = await db.Videojuego.findAll();

        const videojuegosResp = [];
        for (var vj of videojuegos) {
            const consolas = await vj.getConsolas();
            const vjAEnviar = {
                id : vj.id,
                nombre : vj.nombre,
                precio : vj.precio,
                categoriaId : vj.categoria,
                createdAt : vj.createdAt,
                updatedAt : vj.updatedAt,
                consolas : consolas
            };
            //console.log(consolas);
            videojuegosResp.push(vjAEnviar);
        }

        res.send({
            data : videojuegosResp,
            msg : ""
        })
    
    }
}

module.exports = videojuegoAPI;