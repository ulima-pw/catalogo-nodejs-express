const data = {
    imagenes : [
        {
            nombre : "Cyberpunk 2077",
            imagen : "/imagenes/imagen.jpg"
        },
        {
            nombre : "Red Dead Redemption 2",
            imagen : "https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/RCVN57YFWFBNBJO3VM4IS3ZO3U.jpg"
        },
        {
            nombre : "Scott Pilgrim vs The World",
            imagen : "https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_ScottPilgrimVsTheWorldTheGameCompleteEdition_image1600w.jpg"
        }
    ],
    usuarios : [],
    paises : [
        { id : 1, nombre : "Peru" },
        { id : 2, nombre : "Venezuela" },
        { id : 3, nombre : "Ecuador" },
        { id : 4, nombre : "Chile" }
    ],
    videojuegos : [
        {
            id : 1,
            nombre : "Cyberpunk 2077",
            consolas : "PC",
            precio : 65
        },
        {
            id : 2, 
            nombre : "Fifa 21",
            consolas : "PS4/PS5",
            precio : 30
        },
        {
            id : 3,
            nombre : "Civilization 6",
            consolas : "PC",
            precio : 20
        },
        {
            id : 4,
            nombre : "Demons souls",
            consolas : "PS5",
            precio : 40
        }
    ]
}

module.exports = data;