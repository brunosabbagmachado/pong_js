//Variaveis para poder desenhar no canvas
let tela = document.querySelector("canvas");
let pincel = tela.getContext("2d");

//Variaveis para medir a tela
let maxWidth = 600;
let maxHeight = 400;

//Variaveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 12;
let raio = diametro / 2;
let velocidadeXBolinha = 1;
let velocidadeYBolinha = 1;

//Variaveis para o uso das teclas do teclado
let teclaCima = 38;
let teclaBaixo = 40;

//Variaveis da raquete do Jogador
let xRaqueteJogador = 10;
let yRaqueteJogador = 150;

//Variaveis da raquete do Adversario
let xRaqueteAdversario = 575;
let yRaqueteAdversario = 150;
let velocidadeYAdversario;
let chanceDeErrar = 0;

//Comprimento e Altura das Raquetes
let raqueteComprimento = 12;
let raqueteAltura = 80;

//Taxa de movimento das raquetes
let taxaMovimento = 15;

//Placar do jogo
let pontosJogador = 0;
let pontosOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

function preLoad() {
  trilha = new Audio("trilha.mp3");
  raquetada = new Audio("raquetada.mp3");
  ponto = new Audio("ponto.mp3");
}

//Função que limpa a tela
function limpaTela() {
  pincel.clearRect(0, 0, maxWidth, maxHeight);
}

//Função que desenha o background do jogo
function desenhaFundo() {
  pincel.fillStyle = "black";
  pincel.fillRect(0, 0, maxWidth, maxHeight);
}

//Função que desenha a bolinha de acordo com as coordenadas X e Y recebidas
function desenhaBolinha(x, y, diametro) {
  pincel.fillStyle = "white";
  pincel.beginPath();
  pincel.arc(x, y, diametro, 0, 2 * Math.PI);
  pincel.fill();
}

//Função que movimenta a bolinha para os lados, para cima e para baixo
function movimentaBolinha() {
  desenhaBolinha(xBolinha, yBolinha, diametro);
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

//Função que verifica se a bolinha está encostando nas bordas e muda seu direcionamento
function verificaColisoes() {
  //colisão da Bola com as bordas laterais da tela
  if (xBolinha + raio > maxWidth) {
    velocidadeXBolinha *= -1;
    pontosJogador += 1;
  }

  if (xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    pontosOponente += 1;
  }

  //colisão da Bola com as bordas inferior e superior da tela
  if (yBolinha + raio > maxHeight || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }

  //colisão da Bola com a raquete do Jogador
  if (
    xBolinha - raio < xRaqueteJogador + raqueteComprimento &&
    yBolinha - raio < yRaqueteJogador + raqueteAltura &&
    yBolinha + raio > yRaqueteJogador
  ) {
    velocidadeXBolinha *= -1;
  }

  //colisao da Bola com a raquete do Adversario
  if (
    xBolinha - raio > xRaqueteAdversario - raqueteComprimento &&
    yBolinha - raio < yRaqueteAdversario + raqueteAltura &&
    yBolinha + raio > yRaqueteAdversario
  ) {
    velocidadeXBolinha *= -1;
  }
}

//Função que desenha a raquete do Jogador e recebe a posição Y
function desenhaRaquete(x, y) {
  pincel.fillStyle = "white";
  pincel.fillRect(x, y, raqueteComprimento, raqueteAltura);
}

//Função que movimenta a raquete do Jodaor se apertar as teclas "seta para cima" ou "seta para baixo"
function movimentaJogador(event) {
  if (event.keyCode == teclaCima && yRaqueteJogador > 0) {
    yRaqueteJogador = yRaqueteJogador - taxaMovimento;
  } else if (yRaqueteJogador < 320) {
    if (event.keyCode == teclaBaixo) {
      yRaqueteJogador = yRaqueteJogador + taxaMovimento;
    }
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= pontosJogador) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}

//Função que movimenta o adversário em Y sempre seguindo a posição da bolinha
function movimentaAdversario() {
  velocidadeYAdversario = yBolinha - yRaqueteAdversario - raqueteComprimento / 2 - 30;
  yRaqueteAdversario += velocidadeYAdversario + chanceDeErrar;
  calculaChanceDeErrar();
}

function incluiPlacar() {
  pincel.font = "30px serif";
  pincel.textAlign = "center";

  pincel.fillStyle = "orange";
  pincel.fillText(pontosJogador + "    X    " + pontosOponente, 300, 40);
}

//Função que atualiza os frames e chama todas as outras funções
function atualizaTela() {
  limpaTela();
  desenhaFundo();
  movimentaBolinha();
  desenhaRaquete(xRaqueteJogador, yRaqueteJogador);
  desenhaRaquete(xRaqueteAdversario, yRaqueteAdversario);
  movimentaAdversario();
  verificaColisoes();
  incluiPlacar();
}

//Atualiza tela a cada 3 segundos
setInterval(atualizaTela, 1);

//Recebe o movimento do jogador quando a tecla está apertada
document.onkeydown = movimentaJogador;
