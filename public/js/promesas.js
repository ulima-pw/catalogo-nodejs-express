var contador = 0;

var configurarSleep = ()  => {
    console.log("Se inicia la ejecucion de configurarSleep")
    var promesa = new Promise( (f) => {
        setTimeout(f, Math.random() * 5000);
    });
    return promesa;
}

var incrementar = () => {
    contador++;
    console.log("Contador: " + contador);
}

var decirHola = () => {
    console.log("HOLA");
}

var main = () => {
    configurarSleep().then(decirHola);


    //window.setInterval(incrementar, 2000);
}
window.addEventListener("load", main);