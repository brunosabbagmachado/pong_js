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
let yJogador = 150;
let taxaMovimento = 15;

//Variaveis da raquete do Adversario
let yAdversario = 150;

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
function verificaColisaoBorda (){
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
  pincel.fillRect(10, y, 12, 80);
}

//Função que movimenta a raquete do Jodaor se apertar as teclas "seta para cima" ou "seta para baixo"
function movimentaJogador(event) {
  if (event.keyCode == teclaCima && yJogador > 0) {
    yJogador = yJogador - taxaMovimento;
  } else if (yJogador < 320) {
    if (event.keyCode == teclaBaixo) {
      yJogador = yJogador + taxaMovimento;
    }
  }
}

//Função que desenha o adversário e recebe uma posição Y
function desenhaAdversario(y) {
  pincel.fillStyle = "white";
  pincel.fillRect(575, y, 12, 80);
}

//Função que movimenta o adversário em Y sempre seguindo a posição da bolinha
function movimentaAdversario() {
  if (yAdversario < tela.offsetHeight) {
    yAdversario = yBolinha - 60;
  }
  desenhaAdversario(yAdversario);
}

//Função que atualiza os frames e chama todas as outras funções
function atualizaTela() {
  limpaTela();
  desenhaFundo();
  movimentaBolinha();
  verificaColisaoBorda();
  desenhaJogador(yJogador);
  movimentaAdversario();
}

//Atualiza tela a cada 3 segundos
setInterval(atualizaTela, 3);

//Recebe o movimento do jogador quando a tecla está apertada
document.onkeydown = movimentaJogador;

