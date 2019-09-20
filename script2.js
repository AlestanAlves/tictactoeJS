let jogoDaVelha = new TicTacToeGame();
jogoDaVelha.start();

function TicTacToeGame() {
  let board = new Board();
  let humanPlayer = new HumanPlayer(board);
  let computerPlayer = new ComputerPlayer(board);
  let turn = 0;

  this.start = function() {
    let config = { childList: true };
    let observer = new MutationObserver(() => takeTurn());
    board.posicoes.forEach((el) => observer.observe(el, config));
    takeTurn();
  }

  function takeTurn() {
    if (board.checkForjogadaGanhador()) {
      return;
    }

    if (turn % 2 === 0) {
      humanPlayer.takeTurn();
    } else {
      computerPlayer.takeTurn();
    }

    turn++;
  };
}

function Board() {
  this.posicoes = Array.from(document.querySelectorAll('.quadr'));

  this.checkForjogadaGanhador = function() {
    let jogadaGanhador = false;

    let Combinacoesdoganhador = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    let posicoes = this.posicoes;
    Combinacoesdoganhador.forEach((ganhadorCombo) => {
      let pos0InnerText = posicoes[ganhadorCombo[0]].innerText;
      let pos1InnerText = posicoes[ganhadorCombo[1]].innerText;
      let pos2InnerText = posicoes[ganhadorCombo[2]].innerText;
      let isganhadorCombo = pos0InnerText !== '' &&
        pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
      if (isganhadorCombo) {
          jogadaGanhador = true;
          ganhadorCombo.forEach((index) => {
            posicoes[index].className += ' jogadaGanhador';
          })
      }
    });

    return jogadaGanhador;
  }
}

function ComputerPlayer(board) {
  this.takeTurn = function() {
    let availableposicoes = board.posicoes.filter((p) => p.innerText === '');
    let move = Math.floor(Math.random() * (availableposicoes.length - 0));
    availableposicoes[move].innerText = 'O';
  }
}

function HumanPlayer(board) {
  this.takeTurn = function() {
    board.posicoes.forEach(el =>
      el.addEventListener('click', handleTurnTaken));
  }

  function handleTurnTaken(event) {
    event.target.innerText = 'X';
    board.posicoes
      .forEach(el => el.removeEventListener('click', handleTurnTaken));
  }
}