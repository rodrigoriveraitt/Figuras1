let jugador;
let pelotas = [];
let puntaje = 0;
let gameState = 'jugar';

function setup() {
  createCanvas(600, 400);
  jugador = new Jugador();
}
function draw() { 
  noStroke(); 
  colorMode(RGB, 360, 100, 100);
  background(10,30,50);

  if (gameState === 'jugar') {
    // Mover la posición del jugador en la pantalla 
    jugador.update();
    jugador.display();

    // Aparecer nuevas pelotas
    if (frameCount % 20 === 0) {
      pelotas.push(new Pelota());
    }
    // Comprobar en la pantalla cada pelota 
    for (let i = 0; i < pelotas.length; i++) {
      pelotas[i].update();
      pelotas[i].display();
      if (pelotas[i].hits(jugador)) {
        gameState = 'Juego Terminado';
        return;
      }
      // Quitar las pelotas que desaparecen de la pantalla
      if (pelotas[i].offscreen()) {
        pelotas.splice(i, 1);
      }
    }
    // Puntaje 
    textSize(24);
    fill(255);
    text('Puntaje: ' + puntaje, 20, 40);
    puntaje++;
  } else if (gameState === 'Juego Terminado') {
    // Pantalla de Game Over
    textSize(36);
    fill(255);
    textAlign(CENTER);
    text('Juego Terminado', width/2, height/2);
    textSize(24);
    text('Puntaje final: ' + puntaje, width/2, height/2 + 40);
  }
}
class Jugador {
  constructor() {
    this.x = width/2;
    this.y = height - 20;
  }
  display() {
    fill(255);
    rect(this.x-20, this.y-20, 80, 20);
  }
  // Mover al jugador con las teclas
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 10;
    } 
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 10;
    }
    // Mantener al jugador
    this.x = constrain(this.x, 20, width-60);
  }
}
class Pelota {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.speed = 3;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 20, 20);
  }
  // Mover la pelota
  update() {
    this.y += this.speed;
    this.speed += 0.2;
  }
  // Ver que la pelota chocó con el jugador
  hits(jugador) {
    if (dist(this.x, this.y, jugador.x, jugador.y) < 20) {
      return true;
    } else {
      return false;
    }
  }
  // Comprobar que la pelota salió de la pantalla
  offscreen() {
    if (this.y > height) {
      return true;
    } else {
      return false;
    }
  }
}