class Pedido {
    constructor(numPed, cliente, fechaPed, procesado, servido) {
        this.numPed = numPed;
        this.cliente = cliente;
        this.fechaPed = fechaPed;
        this.procesado = procesado;
        this.servido = servido;
    }
}

class Pieza{

constructor(numPie, numPed, largo, ancho, grosor, color, ambasCaras, cortada){
    this.numPie = numPie
    this.numPed = numPed
    this.largo = largo
    this.ancho = ancho
    this.grosor = grosor
    this.color = color
    this.ambasCaras = ambasCaras
    this.cortada = cortada
}


}

class Gestor {
    constructor() {
        const pedidosGuardados = localStorage.getItem('pedidos');
    
    if (pedidosGuardados) {
       
        this.pedidos = JSON.parse(pedidosGuardados);
    } else {
        
        this.pedidos = [];
    }
    const piezasGuardadas = localStorage.getItem('piezas');
    
    if (piezasGuardadas) {
        this.piezas = JSON.parse(piezasGuardadas);
    } else {
        this.piezas = [];
    }
        this.validar = new Validarped();
        this.validarr = new Validarpedd();
        this.valid = new Validarpie();
        this.validarrr = new Validarpiee();
    }

    
    altaPedido(numPed, cliente, fechaPed, procesado, servido) {
        var ex = false
        const ped = this.pedidos.find(p => p.numPed === numPed);

        if(ped){
            ex = true
        }

        
        const isValid = this.validar.validarPedido(numPed, ex, cliente, fechaPed, procesado, servido);
        if (isValid) {
            const nuevoPedido = new Pedido(numPed, cliente, fechaPed, procesado, servido);
            this.pedidos.push(nuevoPedido);

            localStorage.setItem('pedidos', JSON.stringify(this.pedidos))

            alert("Pedido guardado");
        } else {
            alert("Error en la validación, no se guarda el pedido.");
        }
    }


    bajaPedido(numPed){

    const index = this.pedidos.findIndex(p => p.numPed === numPed);
    if (index !== -1) {
    this.pedidos.splice(index, 1)
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos))
    alert(`Pedido ${numPed} dado de baja`)
    }else{
        alert("Ese número de pedido no está registrado")
    }

    }


    modificarPedido(numPed, nuevoCliente, nuevaFecha, nuevoProcesado, nuevoServido) {
        const isValid = this.validarr.validarPedido(nuevoCliente, nuevaFecha, nuevoProcesado, nuevoServido);
        if (isValid) {
const ped = this.pedidos.find(p => p.numPed === numPed)
if (ped) {
  ped.cliente = nuevoCliente
  ped.fechaPed = nuevaFecha
  ped.procesado = nuevoProcesado
  ped.servido = nuevoProcesado
  ped.servido = nuevoServido
  localStorage.setItem('pedidos', JSON.stringify(this.pedidos))
  alert("Modificación hecha.")
}else{
    alert("El número de pedido no está registrado.")
}
}else{
alert("Error en la validación, no se guarda la modificación.")
}
}

consultaPedido(numPed) {


const pedido = this.pedidos.find(p => p.numPed === numPed);

        if(pedido){
            const contenido = `
    <p>Numero de pedido: ${pedido.numPed}</p>
    <p>Cliente: ${pedido.cliente}</p>
    <p>Fecha: ${pedido.fechaPed}</p>
    <p>Procesado: ${pedido.procesado ? "Sí" : "No"}</p>
    <p>Servido: ${pedido.servido ? "Sí" : "No"}</p>
`;
            return contenido


} else {

const contenido = `<p>Pedido no encontrado.</p>`;
return contenido
}
}

mostrarPiezasPorPedido(numPed) {

const piezasFiltradas = this.piezas.filter(pieza => pieza.numPed === numPed);


const contenedorTabla = document.getElementById("tabla-piezas");
contenedorTabla.innerHTML = ""; 


let tablaHTML = `
<table border="1" cellspacing="0" cellpadding="5">
<thead>
  <tr>
    <th>Num. Pieza</th>
    <th>Largo</th>
    <th>Ancho</th>
    <th>Grosor</th>
    <th>Color</th>
    <th>Superficie</th>
    <th>Volumen</th>
  </tr>
</thead>
<tbody>
`;


piezasFiltradas.forEach(pieza => {
const superficie = pieza.largo * pieza.ancho; 
const volumen = pieza.largo * pieza.ancho * pieza.grosor; 
tablaHTML += `
<tr>
  <td>${pieza.numPie}</td>
  <td>${pieza.largo}</td>
  <td>${pieza.ancho}</td>
  <td>${pieza.grosor}</td>
  <td>${pieza.color}</td>
  <td>${superficie.toFixed(2)}</td>
  <td>${volumen.toFixed(2)}</td>
</tr>
`;
});


tablaHTML += `
</tbody>
</table>
`;


contenedorTabla.innerHTML = tablaHTML;
}



    altaPieza(numPie, numPed, largo, ancho, grosor, color, ambasCaras, cortada) {
        
        var ex = true
        var exdos = true

        const ped = this.pedidos.find(p => p.numPed === numPed);
        const pie = this.piezas.find(p => p.numPie === numPie)

        if(ped){
            ex = false
        }
        if(pie){
            exdos = false
        }


      
        const isValid = this.valid.validarPieza(numPie, numPed, ex, exdos, largo, ancho, grosor, color, ambasCaras, cortada);
        if (isValid) {
            const nuevaPieza = new Pieza(numPie, numPed, largo, ancho, grosor, color, ambasCaras, cortada);
            this.piezas.push(nuevaPieza);

            localStorage.setItem('piezas', JSON.stringify(this.piezas))

            alert("Pieza guardada")
        } else {
            alert("Error en la validación, la pieza no se ha guardado")
        }
    }


    bajaPieza(numPie){

    const index = this.piezas.findIndex(p => p.numPie === numPie)
    if (index !== -1) {
    this.piezas.splice(index, 1)
    localStorage.setItem('piezas', JSON.stringify(this.piezas))
    alert("Pieza dada de baja")
    }else{
        alert("Ese número de pieza no está registrada")
    }

}
modificarPieza(numPie, nuevoLargo, nuevoAncho, nuevoGrosor, nuevoColor, nuevoAmb, nuevoCortada){
    const isValid = this.validarrr.validarPieza(nuevoLargo, nuevoAncho, nuevoGrosor, nuevoColor, nuevoAmb, nuevoCortada);
    if (isValid) {
const pie = this.piezas.find(p => p.numPie === numPie)

if (pie) {
pie.largo = nuevoLargo
pie.ancho = nuevoAncho
pie.grosor = nuevoGrosor
pie.color = nuevoColor
pie.ambasCaras = nuevoAmb
pie.cortada = nuevoCortada
localStorage.setItem('piezas', JSON.stringify(this.piezas))
alert("Modificación hecha")

}else{
alert("El número de pieza no existe.")
}
}else{
alert("Error en la validación, no se guarda la modificación.")
}

}

consultaPieza(numPie) {


const pie = this.piezas.find(p => p.numPie === numPie);

if(pie){
    const contenido = `
    <p>Numero de pieza: ${pie.numPie}</p>
    <p>Número de pedido: ${pie.numPed}</p>
    <p>Largo: ${pie.largo}cm</p>
    <p>Ancho: ${pie.ancho}cm</p>
    <p>Grosor: ${pie.grosor}cm</p>
    <p>Color: ${pie.color}</p>
    <p>AmbasCaras: ${pie.ambasCaras ? "Sí" : "No"}</p>
    <p>Cortada: ${pie.cortada ? "Sí" : "No"}</p>
`;
            return contenido
}else{
    const contenido = `<p>Pieza no encontrada.</p>`;
    return contenido
}
}

}

class Validarpie{

    validarPieza(numPie, numPed, ex, exdos, largo, ancho, grosor, color, ambasCaras, cortada){
        let isValid = true;
        this.ocultarErrores();


       
if (typeof numPie !== 'number' || isNaN(numPie) || numPie < 1 || !Number.isInteger(numPie) || exdos == false) {
document.getElementById("f").style.display = "inline";
isValid = false;
}


if (typeof numPed !== 'number' || isNaN(numPed) || numPed < 1 || !Number.isInteger(numPed) || ex == true) {
document.getElementById("g").style.display = "inline";
isValid = false;
}


if (typeof largo !== 'number' || isNaN(largo) || largo <= 0) {
document.getElementById("h").style.display = "inline";
isValid = false;
}


if (typeof ancho !== 'number' || isNaN(ancho) || ancho <= 0) {
document.getElementById("i").style.display = "inline";
isValid = false;
}


if (typeof grosor !== 'number' || isNaN(grosor) || grosor <= 0) {
document.getElementById("j").style.display = "inline";
isValid = false;
}


if (typeof color != 'string' || !isNaN(color)) {
document.getElementById("k").style.display = "inline";
isValid = false;
}


if (typeof ambasCaras !== 'boolean') {
document.getElementById("l").style.display = "inline";
isValid = false;
}


if (typeof cortada !== 'boolean') {
document.getElementById("m").style.display = "inline";
isValid = false;
}

return isValid;

    }
    ocultarErrores() {
        document.getElementById("f").style.display = "none";
        document.getElementById("g").style.display = "none";
        document.getElementById("h").style.display = "none";
        document.getElementById("i").style.display = "none";
        document.getElementById("j").style.display = "none";
        document.getElementById("k").style.display = "none";
        document.getElementById("l").style.display = "none";
        document.getElementById("m").style.display = "none";
    }


}

class Validarpiee{
    validarPieza(largo, ancho, grosor, color, ambasCaras, cortada){
        let isValid = true;
        this.ocultarErrores();




if (typeof largo !== 'number' || isNaN(largo) || largo <= 0) {
document.getElementById("h").style.display = "inline";
isValid = false;
}


if (typeof ancho !== 'number' || isNaN(ancho) || ancho <= 0) {
document.getElementById("i").style.display = "inline";
isValid = false;
}


if (typeof grosor !== 'number' || isNaN(grosor) || grosor <= 0) {
document.getElementById("j").style.display = "inline";
isValid = false;
}


if (typeof color != 'string' || !isNaN(color)) {
document.getElementById("k").style.display = "inline";
isValid = false;
}


if (typeof ambasCaras !== 'boolean') {
document.getElementById("l").style.display = "inline";
isValid = false;
}


if (typeof cortada !== 'boolean') {
document.getElementById("m").style.display = "inline";
isValid = false;
}

return isValid;

    }
    ocultarErrores() {
        document.getElementById("f").style.display = "none";
        document.getElementById("g").style.display = "none";
        document.getElementById("h").style.display = "none";
        document.getElementById("i").style.display = "none";
        document.getElementById("j").style.display = "none";
        document.getElementById("k").style.display = "none";
        document.getElementById("l").style.display = "none";
        document.getElementById("m").style.display = "none";
    }
}

class Validarped {
    
    validarPedido(numPed, ex, cliente, fechaPed, procesado, servido) {
        let isValid = true;

      
        this.ocultarErrores();

        if (isNaN(numPed) || numPed < 1 || numPed % 1 !== 0 || ex == true) {
            document.getElementById("a").style.display = "inline"; 
            isValid = false;
        }

        if (typeof cliente !== 'string' || cliente.trim() === "" || !isNaN(Number(cliente))) {
            document.getElementById("b").style.display = "inline";  
            isValid = false;
        }

        const fecha = new Date(fechaPed);
        if (isNaN(fecha.getTime()) || fecha > new Date()) {
            document.getElementById("c").style.display = "inline";  
            isValid = false;
        }

        if (typeof procesado !== 'boolean') {
            document.getElementById("d").style.display = "inline";  
            isValid = false;
        }

        if (typeof servido !== 'boolean') {
            document.getElementById("e").style.display = "inline";  
            isValid = false;
        }

        return isValid;
    }

    ocultarErrores() {
        document.getElementById("a").style.display = "none";
        document.getElementById("b").style.display = "none";
        document.getElementById("c").style.display = "none";
        document.getElementById("d").style.display = "none";
        document.getElementById("e").style.display = "none";
    }
}


class Validarpedd{
    validarPedido(cliente, fechaPed, procesado, servido) {
        let isValid = true;

        this.ocultarErrores();

       

        if (typeof cliente !== 'string' || cliente.trim() === "" || !isNaN(Number(cliente))) {
            document.getElementById("b").style.display = "inline"; 
            isValid = false;
        }

        const fecha = new Date(fechaPed);
        if (isNaN(fecha.getTime()) || fecha > new Date()) {
            document.getElementById("c").style.display = "inline";  
            isValid = false;
        }

        if (typeof procesado !== 'boolean') {
            document.getElementById("d").style.display = "inline";  
            isValid = false;
        }

        if (typeof servido !== 'boolean') {
            document.getElementById("e").style.display = "inline";  
            isValid = false;
        }

        return isValid;
    }

    ocultarErrores() {
        document.getElementById("a").style.display = "none";
        document.getElementById("b").style.display = "none";
        document.getElementById("c").style.display = "none";
        document.getElementById("d").style.display = "none";
        document.getElementById("e").style.display = "none";
    }
}


const gestor = new Gestor();

function altaPedido() {
    const numPed = parseInt(document.getElementById("numero").value); 
    const cliente = document.getElementById("cliente").value;
    const fechaPed = document.getElementById("fecha").value;
    const procesado = document.getElementById("procesado").checked; 
    const servido = document.getElementById("servido").checked; 

    

    gestor.altaPedido(numPed, cliente, fechaPed, procesado, servido);
}

function bajaPedido(){
    const numPed = parseInt(document.getElementById("numero").value)

    gestor.bajaPedido(numPed)
}

function modifPedido() {
    const numPed = parseInt(document.getElementById("numero").value); 
    const cliente = document.getElementById("cliente").value;
    const fechaPed = document.getElementById("fecha").value;
    const procesado = document.getElementById("procesado").checked; 
    const servido = document.getElementById("servido").checked; 

    gestor.modificarPedido(numPed, cliente, fechaPed, procesado, servido);
}

function consulPedido(){
    const numPed = parseInt(document.getElementById("numero").value)

   var contenido = gestor.consultaPedido(numPed)
   document.getElementById("datos").innerHTML = contenido
}

function altaPieza(){

    const numPie = parseInt(document.getElementById("pie").value); 
    const numPed = parseInt(document.getElementById("pe").value);
    const largo = parseInt(document.getElementById("largo").value);
    const ancho = parseInt(document.getElementById("ancho").value);
    const grosor = parseInt(document.getElementById("grosor").value);
    const color = document.getElementById("color").value;
    const ambasCaras = document.getElementById("caras").checked; 
    const cortada = document.getElementById("cortada").checked;

    gestor.altaPieza(numPie, numPed, largo, ancho, grosor, color, ambasCaras, cortada)

}

function bajaPieza(){
    const numPie = parseInt(document.getElementById("pie").value)

    gestor.bajaPieza(numPie)
}

function modifPieza() {
    const numPie = parseInt(document.getElementById("pie").value);
    const largo = parseInt(document.getElementById("largo").value);
    const ancho = parseInt(document.getElementById("ancho").value);
    const grosor = parseInt(document.getElementById("grosor").value);
    const color = document.getElementById("color").value;
    const ambasCaras = document.getElementById("caras").checked; 
    const cortada = document.getElementById("cortada").checked;

    gestor.modificarPieza(numPie, largo, ancho, grosor, color, ambasCaras, cortada);
}

function consulPieza(){
    const numPie = parseInt(document.getElementById("pie").value)
    var contenido = gestor.consultaPieza(numPie)
    document.getElementById("datospie").innerHTML = contenido
}
 function detalle(){
    const numPed = parseInt(document.getElementById("numero").value)
    gestor.mostrarPiezasPorPedido(numPed)
 }

function mostrargesPed(){
    document.getElementById("pedidos").style.display = "block";
    document.getElementById("menu").style.display = "none";
}

function mostrargesPie(){
    document.getElementById("piezas").style.display = "block";
    document.getElementById("menu").style.display = "none";
}

function atras(){
    document.getElementById("pedidos").style.display = "none";
    document.getElementById("piezas").style.display = "none";
    document.getElementById("menu").style.display = "block";
}