window.onload = function() {
  let playerId =localStorage.getItem('playerId');
  axios.get(`http://localhost:3000/players/getvsplayer/${playerId}`)
    .then(function (response) {
      document.getElementById('P1name').innerText = response.data[0].name
      document.getElementById('P2name').innerText = response.data[1].name
    })
    .catch(function (error) {
      console.log(error);
    });
}

var puntosuser = 0, puntoscpu = 0;
var cont = 1;

function sistemaPuntosUser() {
  puntosuser = puntosuser + cont;
  ganar();
  setTimeout(parar, 2000);
  document.getElementById("P1puntos").innerHTML = puntosuser;
  if (puntosuser == 1) {
    document.getElementById("P2vida1").style.display = "none";
    document.getElementById("P2muerte1").style.display = "inline";
  }
  if (puntosuser == 2) {
    document.getElementById("P2vida2").style.display = "none";
    document.getElementById("P2muerte2").style.display = "inline";
  }
  if (puntosuser == 3) {
    document.getElementById("P2vida3").style.display = "none";
    document.getElementById("P2muerte3").style.display = "inline";
    alert("Ganaste la partida");
    reiniciar();
  }
}

function sistemaPuntosCpu() {
  puntoscpu = puntoscpu + cont;
  perder();
  setTimeout(parar, 2000);
  document.getElementById("P2puntos").innerHTML = puntoscpu;
  if (puntoscpu == 1) {
    document.getElementById("P1vida1").style.display = "none";
    document.getElementById("P1muerte1").style.display = "inline";
  }
  if (puntoscpu == 2) {
    document.getElementById("P1vida2").style.display = "none";
    document.getElementById("P1muerte2").style.display = "inline";
  }
  if (puntoscpu == 3) {
    document.getElementById("P1vida3").style.display = "none";
    document.getElementById("P1muerte3").style.display = "inline";
    alert("Perdiste la partida");
    reiniciar();
  }


}

function reiniciar() {
  puntoscpu = 0;
  puntosuser = 0;
  document.getElementById("P1puntos").innerHTML = "0";
  document.getElementById("P2puntos").innerHTML = "0";

  document.getElementById("P1vida1").style.display = "inline";
  document.getElementById("P1muerte1").style.display = "none";
  document.getElementById("P1vida2").style.display = "inline";
  document.getElementById("P1muerte2").style.display = "none";
  document.getElementById("P1vida3").style.display = "inline";
  document.getElementById("P1muerte3").style.display = "none";

  document.getElementById("P2vida1").style.display = "inline";
  document.getElementById("P2muerte1").style.display = "none";
  document.getElementById("P2vida2").style.display = "inline";
  document.getElementById("P2muerte2").style.display = "none";
  document.getElementById("P2vida3").style.display = "inline";
  document.getElementById("P2muerte3").style.display = "none";
}

var colorFondo;
function ganar() {
  colorFondo = setInterval(configurarColor, 100);

  function configurarColor() {
    var x = document.body;
    x.style.backgroundColor = x.style.backgroundColor == "green" ? "MediumSpringGreen" : "green";
  }
}
function perder() {
  colorFondo = setInterval(configurarColor, 100);

  function configurarColor() {
    var x = document.body;
    x.style.backgroundColor = x.style.backgroundColor == "red" ? "DarkRed" : "red";
  }
}
function parar() {
  clearInterval(colorFondo);
  document.body.style.background = "#f4f4f4";
}



function piedra(player) {
  setTimeout(ronda, 2000);
  var piedra = document.getElementById("P1piedra");
  var papel = document.getElementById("P1papel");
  var tijera = document.getElementById("P1tijera");
  var cpupiedra = document.getElementById("P2piedra");
  var cpupapel = document.getElementById("P2papel");
  var cputijera = document.getElementById("P2tijera");
  var resultado = document.getElementById("resultado");

  piedra.style.display = "block";
  papel.style.display = "none";
  tijera.style.display = "none";

  var azar = parseInt(Math.random() * 3); // de 0 a 3
  debugger
  switch (azar) {
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


function papel(player) {
  setTimeout(ronda, 2000);
  var piedra = document.getElementById("P1piedra");
  var papel = document.getElementById("P1papel");
  var tijera = document.getElementById("P1tijera");
  var cpupiedra = document.getElementById("P2piedra");
  var cpupapel = document.getElementById("P2papel");
  var cputijera = document.getElementById("P2tijera");
  var resultado = document.getElementById("resultado");
  piedra.style.display = "none";
  papel.style.display = "papel";
  tijera.style.display = "none";

  var azar = parseInt(Math.random() * 3); // de 0 a 3

  switch (azar) {
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

function tijera(player) {
  setTimeout(ronda, 2000);
  var piedra = document.getElementById("P1piedra");
  var papel = document.getElementById("P1papel");
  var tijera = document.getElementById("P1tijera");
  var cpupiedra = document.getElementById("P2piedra");
  var cpupapel = document.getElementById("P2papel");
  var cputijera = document.getElementById("P2tijera");
  var resultado = document.getElementById("resultado");
  piedra.style.display = "none";
  papel.style.display = "none";
  tijera.style.display = "block";

  var azar = parseInt(Math.random() * 3); // de 0 a 3

  switch (azar) {
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
  var piedra = document.getElementById("P1piedra").style.display = "block";
  var papel = document.getElementById("P1papel").style.display = "block";
  var tijera = document.getElementById("P1tijera").style.display = "block";
  var cpupiedra = document.getElementById("P2piedra").style.display = "block";
  var cpupapel = document.getElementById("P2papel").style.display = "block";
  var cputijera = document.getElementById("P2tijera").style.display = "block";
}