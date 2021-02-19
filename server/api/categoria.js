const db = require('../dao/models')

const categoriaAPI = {
    get : (req, resp) => {},
    getAll : async (req, resp) => {
        const categorias = await db.Categoria.findAll();
        resp.json({
            data : categorias,
            msg : ""
        });
    }
};

module.exports = categoriaAPI;