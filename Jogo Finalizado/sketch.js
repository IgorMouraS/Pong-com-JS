//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 10;
let yRaquete = 200;
let raqueteComprimento = 5;
let raqueteAltura = 60;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 200;
let velocidadeYOponente;
let chanceDeErrar = 0;

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons do joso
let raquetada;
let ponto;
let trilha;

function preload(){
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete();
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  mostraRaqueteOponente();
  movimentaRaqueteOponente();
  verificaColisaoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(){
  rect(xRaquete, yRaquete, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 6;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 6;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();

  }
}

function mostraRaqueteOponente(){
  rect(xRaqueteOponente, yRaqueteOponente, raqueteComprimento, 
      raqueteAltura);
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 50;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 69){
    chanceDeErrar = 70
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 40){
    chanceDeErrar = 40
    }
  }
}

function verificaColisaoRaqueteOponente(){
  if (xBolinha + raio > xRaqueteOponente && 
      yBolinha + raio > yRaqueteOponente && 
      yBolinha - raio < yRaqueteOponente + raqueteAltura ){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar(){
  textAlign(CENTER);
  textSize(20);
  stroke(255);
  fill(color(255, 140, 0));
  rect(180, 12, 40, 20);
  fill(255);
  text(meusPontos, 200, 30);
  fill(color(255, 140, 0));
  rect(380, 12, 40, 20);
  fill(255);
  text(pontosOponente, 400, 30);
}

function marcaPonto(){
  if(xBolinha + raio > 599){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha - raio < 1){
    pontosOponente += 1;
    ponto.play();
  }
}