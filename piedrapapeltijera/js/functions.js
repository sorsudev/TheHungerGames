window.onload = function() {
  let playerId =localStorage.getItem('playerId');
  axios.get(`http://localhost:3000/players/getvsplayer/${playerId}`)
    .then(function (response) {
      let p1 = response.data[0];
      let p2 = response.data[1];
      document.getElementById('P1name').innerText = response.data[0].name
      document.getElementById('P2name').innerText = response.data[1].name
      if (p1.id.toString() === playerId){
        vsPlayer = p2.id;
        localStorage.setItem('currentPlayerScore', p1.current_game_score);
        localStorage.setItem('currentPlayer', 'P1');
        document.querySelector('.lados.p2').classList.add('disabled');
        document.querySelector('.lados').classList.add('active');
        var P1piedra = document.getElementById("P1piedra");
        var P1papel = document.getElementById("P1papel");
        var P1tijera = document.getElementById("P1tijera");
        P1piedra.addEventListener('click', piedra);
        P1papel.addEventListener('click', papel);
        P1tijera.addEventListener('click', tijera);
      } else {
        vsPlayer = p1.id;
        localStorage.setItem('currentPlayerScore', p2.current_game_score);
        localStorage.setItem('currentPlayer', 'P2');
        document.querySelector('.lados').classList.add('disabled');
        document.querySelector('.lados.p2').classList.add('active');
        var P2piedra = document.getElementById("P2piedra");
        var P2papel = document.getElementById("P2papel");
        var P2tijera = document.getElementById("P2tijera");
        P2piedra.addEventListener('click', piedra);
        P2papel.addEventListener('click', papel);
        P2tijera.addEventListener('click', tijera);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

var vsPlayer = 2;
var cont = 1;

function sistemaPuntos(status) {
  if (status === 'win') {
    let playerId = localStorage.getItem('playerId');
    var puntos = parseInt(localStorage.getItem('currentPlayerScore'));
    axios.patch(`http://localhost:3000/players/${playerId}`, {
      current_game_score: puntos+=1,
    })
      .then(function (response) {
        localStorage.setItem('currentPlayerScrore', response.data.current_game_score);
        puntos = localStorage.getItem('currentPlayerScore');
        ganar();
        setTimeout(parar, 2000);
        document.getElementById("P1puntos").innerHTML = puntos;
        if (puntos == 1) {
          document.getElementById("P2vida1").style.display = "none";
          document.getElementById("P2muerte1").style.display = "inline";
        }
        if (puntos == 2) {
          document.getElementById("P2vida2").style.display = "none";
          document.getElementById("P2muerte2").style.display = "inline";
        }
        if (puntos == 3) {
          document.getElementById("P2vida3").style.display = "none";
          document.getElementById("P2muerte3").style.display = "inline";
          alert("Ganaste la partida");
          reiniciar();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    axios.get(`http://localhost:3000/players/${vsPlayer}`)
      .then(function (response) {
        perder();
        setTimeout(parar, 2000);
        let vsPuntos = response.data.current_game_score;
        document.getElementById("P2puntos").innerHTML = vsPuntos;
        if (vsPuntos == 1) {
          document.getElementById("P1vida1").style.display = "none";
          document.getElementById("P1muerte1").style.display = "inline";
        }
        if (vsPuntos == 2) {
          document.getElementById("P1vida2").style.display = "none";
          document.getElementById("P1muerte2").style.display = "inline";
        }
        if (vsPuntos == 3) {
          document.getElementById("P1vida3").style.display = "none";
          document.getElementById("P1muerte3").style.display = "inline";
          alert("Perdiste la partida");
          reiniciar();
        }
      })
      .catch(function (error) {
        alert(error);
      });
  }
}

function reiniciar() {
  let playerId =localStorage.getItem('playerId');
  axios.get(`http://localhost:3000/players/getvsplayer/${playerId}`)
    .then(function (response) {
      response.data.forEach((player) => {
        axios.patch(`http://localhost:3000/players/${player.id}`, {
          current_game_score: 0
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
      clearInterval(colorFondo);
      document.body.style.background = "#f4f4f4";
    })
    .catch(function (error) {
      console.log(error);
    });
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

function empate() {
  axios.patch(`http://localhost:3000/players/${vsPlayer}`, {
    current_game_election: 0
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function parar() {
  let playerId =localStorage.getItem('playerId');
  axios.get(`http://localhost:3000/players/getvsplayer/${playerId}`)
    .then(function (response) {
      response.data.forEach((player) => {
        axios.patch(`http://localhost:3000/players/${player.id}`, {
          current_game_election: 0
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
      clearInterval(colorFondo);
      document.body.style.background = "#f4f4f4";
    })
    .catch(function (error) {
      console.log(error);
    });
}

function waitTurn(cb){
  setTimeout( () => {
    axios.get(`http://localhost:3000/players/${vsPlayer}`)
      .then(function (response) {
        if (response.data.current_game_election === 0)
          return waitTurn(cb);

        return cb(response.data.current_game_election);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, 1000);
}

function piedra() {
  var piedra = document.getElementById("P1piedra");
  var papel = document.getElementById("P1papel");
  var tijera = document.getElementById("P1tijera");
  var P2piedra = document.getElementById("P2piedra");
  var P2papel = document.getElementById("P2papel");
  var P2tijera = document.getElementById("P2tijera");
  var resultado = document.getElementById("resultado");

  if (localStorage.getItem('currentPlayer') === 'P1'){
    piedra.style.display = "block";
    papel.style.display = "none";
    tijera.style.display = "none";
  } else {
    P2piedra.style.display = "block";
    P2papel.style.display = "none";
    P2tijera.style.display = "none";
  }

  let playerId = localStorage.getItem('playerId');
  axios.patch(`http://localhost:3000/players/${playerId}`, {
    current_game_election: 1 
  })
    .then(function (response) {
      waitTurn( (vsSelection) => {
        setTimeout(ronda, 2000);
        switch (vsSelection) {
          case 1:
            P2piedra.style.display = "block";
            P2papel.style.display = "none";
            P2tijera.style.display = "none";
            resultado.innerHTML = "Empate";
            empate();
            break;
          case 2:
            P2piedra.style.display = "none";
            P2papel.style.display = "block";
            P2tijera.style.display = "none";
            resultado.innerHTML = "Perdiste";
            sistemaPuntos('lost');
            break;
          case 3:
            P2piedra.style.display = "none";
            P2papel.style.display = "none";
            P2tijera.style.display = "block";
            resultado.innerHTML = "Ganaste";
            sistemaPuntos('win');
            break;
        }
      });
    })
    .catch(function (error) {
      alert(error);
    });
}


function papel() {
  var piedra = document.getElementById("P1piedra");
  var papel = document.getElementById("P1papel");
  var tijera = document.getElementById("P1tijera");
  var P2piedra = document.getElementById("P2piedra");
  var P2papel = document.getElementById("P2papel");
  var P2tijera = document.getElementById("P2tijera");
  var resultado = document.getElementById("resultado");

  if (localStorage.getItem('currentPlayer') === 'P1'){
    piedra.style.display = "none";
    papel.style.display = "block";
    tijera.style.display = "none";
  } else {
    P2piedra.style.display = "none";
    P2papel.style.display = "block";
    P2tijera.style.display = "none";
  }

  let playerId = localStorage.getItem('playerId');
  axios.patch(`http://localhost:3000/players/${playerId}`, {
    current_game_election: 2 
  })
    .then(function (response) {
      waitTurn( (vsSelection) => {
        setTimeout(ronda, 2000);
        switch (vsSelection) {
          case 1:
            P2piedra.style.display = "block";
            P2papel.style.display = "none";
            P2tijera.style.display = "none";
            resultado.innerHTML = "Ganaste";
            sistemaPuntos('win');
            break;
          case 2:
            P2piedra.style.display = "none";
            P2papel.style.display = "block";
            P2tijera.style.display = "none";
            resultado.innerHTML = "Empate";
            empate();
            break;
          case 3:
            P2piedra.style.display = "none";
            P2papel.style.display = "none";
            P2tijera.style.display = "block";
            resultado.innerHTML = "Perdiste";
            sistemaPuntos('lost');
            break;
        }
      });
    })
    .catch(function (error) {
      alert(error);
    });
}

function tijera() {
  var piedra = document.getElementById("P1piedra");
  var papel = document.getElementById("P1papel");
  var tijera = document.getElementById("P1tijera");
  var P2piedra = document.getElementById("P2piedra");
  var P2papel = document.getElementById("P2papel");
  var P2tijera = document.getElementById("P2tijera");
  var resultado = document.getElementById("resultado");
  if (localStorage.getItem('currentPlayer') === 'P1'){
    piedra.style.display = "none";
    papel.style.display = "none";
    tijera.style.display = "block";
  } else {
    P2piedra.style.display = "none";
    P2papel.style.display = "none";
    P2tijera.style.display = "block";
  }

  let playerId = localStorage.getItem('playerId');
  axios.patch(`http://localhost:3000/players/${playerId}`, {
    current_game_election: 3 
  })
    .then(function (response) {
      waitTurn( (vsSelection) => {
        setTimeout(ronda, 2000);
        switch (vsSelection) {
          case 1:
            P2piedra.style.display = "block";
            P2papel.style.display = "none";
            P2tijera.style.display = "none";
            resultado.innerHTML = "Perdiste";
            sistemaPuntos('lost');
            break;
          case 2:
            P2piedra.style.display = "none";
            P2papel.style.display = "block";
            P2tijera.style.display = "none";
            resultado.innerHTML = "Ganaste";
            sistemaPuntos('win');
            break;
          case 3:
            P2piedra.style.display = "none";
            P2papel.style.display = "none";
            P2tijera.style.display = "block";
            resultado.innerHTML = "Empate";
            empate();
            break;
        }
      });
    })
    .catch(function (error) {
      alert(error);
    });
}

function ronda() {
  var piedra = document.getElementById("P1piedra").style.display = "block";
  var papel = document.getElementById("P1papel").style.display = "block";
  var tijera = document.getElementById("P1tijera").style.display = "block";
  var P2piedra = document.getElementById("P2piedra").style.display = "block";
  var P2papel = document.getElementById("P2papel").style.display = "block";
  var P2tijera = document.getElementById("P2tijera").style.display = "block";
}
