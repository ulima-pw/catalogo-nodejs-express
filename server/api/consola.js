const db = require('../dao/models')

const consolaAPI = {
    get : (req, resp) => {

    },
    getAll : async (req, resp) => {
        const consolas = await db.Consola.findAll();
        resp.json({
            data : consolas,
            msg : ""
        });
    }
};

module.exports = consolaAPI;