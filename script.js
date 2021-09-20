//Variaveis para poder desenhar no canvas
let tela = document.querySelector("canvas");
let pincel = tela.getContext("2d");

//Variaveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 12;
let raio = diametro / 2;

//Variaveis da velocidade
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

//Comprimento e Altura das Raquetes
let raqueteComprimento = 12;
let raqueteAltura = 80;

//Taxa de movimento das raquetes
let taxaMovimento = 15;

//Variaveis para medir a tela
let maxWidth = 600;
let maxHeight = 400;

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
function verificaColisaoBorda() {
  if (xBolinha + raio > maxWidth || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > maxHeight || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

//Função que desenha a raquete do Jogador e recebe a posição Y
function desenhaJogador(y) {
  pincel.fillStyle = "white";
  pincel.fillRect(xRaqueteJogador, y, raqueteComprimento, raqueteAltura);
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

//Função que desenha o adversário e recebe uma posição Y
function desenhaAdversario(y) {
  pincel.fillStyle = "white";
  pincel.fillRect(xRaqueteAdversario, y, raqueteComprimento, raqueteAltura);
}

//Função que movimenta o adversário em Y sempre seguindo a posição da bolinha
function movimentaAdversario() {
  if (yRaqueteAdversario < tela.offsetHeight) {
    yRaqueteAdversario = yBolinha - 60;
  }
  desenhaAdversario(yRaqueteAdversario);
}

function verificaColisaoRaqueteJogador() {
  if (
    xBolinha - raio < xRaqueteJogador + raqueteComprimento &&
    yBolinha - raio < yRaqueteJogador + raqueteAltura &&
    yBolinha + raio > yRaqueteJogador
  ) {
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaqueteAdversario() {
  if (
    xBolinha - raio > xRaqueteAdversario - raqueteComprimento &&
    yBolinha - raio < yRaqueteAdversario + raqueteAltura &&
    yBolinha + raio > yRaqueteAdversario
  ) {
    velocidadeXBolinha *= -1;
  }
}

function verificaColisoes(){
  verificaColisaoBorda();
  verificaColisaoRaqueteJogador();
  verificaColisaoRaqueteAdversario();
}

//Função que atualiza os frames e chama todas as outras funções
function atualizaTela() {
  limpaTela();
  desenhaFundo();
  movimentaBolinha();
  desenhaJogador(yRaqueteJogador);
  movimentaAdversario();
  verificaColisoes();
  
}

//Atualiza tela a cada 3 segundos
setInterval(atualizaTela, 3);

//Recebe o movimento do jogador quando a tecla está apertada
document.onkeydown = movimentaJogador;
