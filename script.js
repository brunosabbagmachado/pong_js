let tela = document.querySelector('canvas');
let pincel = tela.getContext('2d');

pincel.fillStyle = 'black';
pincel.fillRect(0, 0, 600, 400);

let xBolinha = 300;
let yBolinha = 200;

let xSentido = 1;
let ySentido = 1;

let cima = 38;
let baixo = 40;

let yJogador = 150;
let taxaMovimento = 15;

let yAdversario = 150;

function limpaTela() {
    pincel.clearRect(0, 0, 600, 400);
}

function desenhaFundo() {
    pincel.fillStyle = 'black';
    pincel.fillRect(0, 0, 600, 400);
}

function desenhaCirculo(x, y) {
    pincel.fillStyle = 'white';
    pincel.beginPath();
    pincel.arc(x, y, 12, 0, 2 * Math.PI);
    pincel.fill();
}

function movimentaBolinha() {
    if (xBolinha > 600) {
        xSentido = - 1;
    } else if (xBolinha < 0) {
        xSentido = 1;
    }

    if (yBolinha > 399) {
        ySentido = - 1;
    } else if (yBolinha < 1) {
        ySentido = 1;
    }

    desenhaCirculo(xBolinha, yBolinha);
    xBolinha = xBolinha + xSentido;
    yBolinha = yBolinha + ySentido;
}

function desenhaJogador(y) {
    pincel.fillStyle = 'white';
    pincel.fillRect(10, y, 12, 80)
}

function movimentaJogador(evento) {
    if ((event.keyCode == cima) && (yJogador > 0)) {
        yJogador = yJogador - taxaMovimento;
    } else if (yJogador < 320) {
        if (event.keyCode == baixo) {
            yJogador = yJogador + taxaMovimento;
        }
    }
}

function desenhaAdversario(y) {
    pincel.fillStyle = 'white';
    pincel.fillRect(575, y, 12, 80)
}

function movimentaAdversario() {
    if (yAdversario < tela.offsetHeight) {
        yAdversario = yBolinha - 60;
    }
    desenhaAdversario(yAdversario);
}

function atualizaTela() {
    limpaTela();
    desenhaFundo();
    movimentaBolinha();
    desenhaJogador(yJogador);
    movimentaAdversario();
}

setInterval(atualizaTela, 5);

document.onkeydown = movimentaJogador;

console.log(yJogador);
