window.onload = function() {
}

var puntosuser=0,puntoscpu=0;
var cont = 1;

function sistemaPuntosUser() {
puntosuser = puntosuser+cont;
ganar();
setTimeout(parar,2000);
document.getElementById("userpuntos").innerHTML = puntosuser;
if(puntosuser == 1){
  document.getElementById("cpuvida1").style.display = "none";
  document.getElementById("cpumuerte1").style.display = "inline";
}
if(puntosuser == 2){
  document.getElementById("cpuvida2").style.display = "none";
  document.getElementById("cpumuerte2").style.display = "inline";
}
if(puntosuser == 3){
  document.getElementById("cpuvida3").style.display = "none";
  document.getElementById("cpumuerte3").style.display = "inline";
  alert("Ganaste la partida");
  reiniciar();
}
}

function sistemaPuntosCpu() {
puntoscpu = puntoscpu+cont;
perder();
setTimeout(parar,2000);
document.getElementById("cpupuntos").innerHTML = puntoscpu;
if(puntoscpu == 1){
  document.getElementById("vida1").style.display = "none";
  document.getElementById("muerte1").style.display = "inline";
}
if(puntoscpu == 2){
  document.getElementById("vida2").style.display = "none";
  document.getElementById("muerte2").style.display = "inline";
}
if(puntoscpu == 3){
  document.getElementById("vida3").style.display = "none";
  document.getElementById("muerte3").style.display = "inline";
  alert("Perdiste la partida");
  reiniciar();
}


}

function reiniciar() {
  puntoscpu=0;
  puntosuser=0;
  document.getElementById("userpuntos").innerHTML = "0";
  document.getElementById("cpupuntos").innerHTML = "0";

  document.getElementById("vida1").style.display = "inline";
  document.getElementById("muerte1").style.display = "none";
  document.getElementById("vida2").style.display = "inline";
  document.getElementById("muerte2").style.display = "none";
  document.getElementById("vida3").style.display = "inline";
  document.getElementById("muerte3").style.display = "none";

  document.getElementById("cpuvida1").style.display = "inline";
  document.getElementById("cpumuerte1").style.display = "none";
  document.getElementById("cpuvida2").style.display = "inline";
  document.getElementById("cpumuerte2").style.display = "none";
  document.getElementById("cpuvida3").style.display = "inline";
  document.getElementById("cpumuerte3").style.display = "none";
}

var colorFondo;
function ganar() {
colorFondo = setInterval (configurarColor, 100);

     function configurarColor() {
          var x = document.body;
          x.style.backgroundColor = x.style.backgroundColor == "green" ? "MediumSpringGreen" : "green";
     }
}
function perder() {
colorFondo = setInterval (configurarColor, 100);

     function configurarColor() {
          var x = document.body;
          x.style.backgroundColor = x.style.backgroundColor == "red" ? "DarkRed" : "red";
     }
}
function parar() {
     clearInterval(colorFondo);
     document.body.style.background = "#f4f4f4";
}



function piedra() {
  setTimeout(ronda, 2000);
  var piedra=document.getElementById("piedra");
  var papel=document.getElementById("papel");
  var tijera=document.getElementById("tijera");
  var cpupiedra=document.getElementById("cpupiedra");
  var cpupapel=document.getElementById("cpupapel");
  var cputijera=document.getElementById("cputijera");
  var resultado=document.getElementById("resultado");

  piedra.style.display = "block";
  papel.style.display = "none";
  tijera.style.display = "none";

  var azar = parseInt(Math.random()*3); // de 0 a 3

  switch(azar){
    case 0:
    cpupiedra.style.display = "block";
    cpupapel.style.display = "none";
    cputijera.style.display = "none";
    resultado.innerHTML = "Empate";
    break;
    case 1:
    cpupiedra.style.display = "none";
    cpupapel.style.display = "block";
    cputijera.style.display = "none";
    resultado.innerHTML = "Perdiste";
    sistemaPuntosCpu();
    break;
    case 2:
    cpupiedra.style.display = "none";
    cpupapel.style.display = "none";
    cputijera.style.display = "block";
    resultado.innerHTML = "Ganaste";
    sistemaPuntosUser();
    break;
  }
}


function papel() {
  setTimeout(ronda, 2000);
  var piedra=document.getElementById("piedra");
  var papel=document.getElementById("papel");
  var tijera=document.getElementById("tijera");
  var cpupiedra=document.getElementById("cpupiedra");
  var cpupapel=document.getElementById("cpupapel");
  var cputijera=document.getElementById("cputijera");
  var resultado=document.getElementById("resultado");
  piedra.style.display = "none";
  papel.style.display = "papel";
  tijera.style.display = "none";

  var azar = parseInt(Math.random()*3); // de 0 a 3

  switch(azar){
    case 0:
    cpupiedra.style.display = "block";
    cpupapel.style.display = "none";
    cputijera.style.display = "none";
    resultado.innerHTML = "Ganaste";
    sistemaPuntosUser();
    break;
    case 1:
    cpupiedra.style.display = "none";
    cpupapel.style.display = "block";
    cputijera.style.display = "none";
    resultado.innerHTML = "Empate";
    break;
    case 2:
    cpupiedra.style.display = "none";
    cpupapel.style.display = "none";
    cputijera.style.display = "block";
    resultado.innerHTML = "Perdiste";
    sistemaPuntosCpu();
    break;
  }
}

function tijera() {
  setTimeout(ronda, 2000);
  var piedra=document.getElementById("piedra");
  var papel=document.getElementById("papel");
  var tijera=document.getElementById("tijera");
  var cpupiedra=document.getElementById("cpupiedra");
  var cpupapel=document.getElementById("cpupapel");
  var cputijera=document.getElementById("cputijera");
  var resultado=document.getElementById("resultado");
  piedra.style.display = "none";
  papel.style.display = "none";
  tijera.style.display = "block";

  var azar = parseInt(Math.random()*3); // de 0 a 3

  switch(azar){
    case 0:
    cpupiedra.style.display = "block";
    cpupapel.style.display = "none";
    cputijera.style.display = "none";
    resultado.innerHTML = "Perdiste";
    sistemaPuntosCpu();
    break;
    case 1:
    cpupiedra.style.display = "none";
    cpupapel.style.display = "block";
    cputijera.style.display = "none";
    resultado.innerHTML = "Ganaste";
    sistemaPuntosUser();
    break;
    case 2:
    cpupiedra.style.display = "none";
    cpupapel.style.display = "none";
    cputijera.style.display = "block";
    resultado.innerHTML = "Empate";
    break;
  }
}

function ronda() {
  var piedra=document.getElementById("piedra").style.display = "block";
  var papel=document.getElementById("papel").style.display = "block";
  var tijera=document.getElementById("tijera").style.display = "block";
  var cpupiedra=document.getElementById("cpupiedra").style.display = "block";
  var cpupapel=document.getElementById("cpupapel").style.display = "block";
  var cputijera=document.getElementById("cputijera").style.display = "block";
}