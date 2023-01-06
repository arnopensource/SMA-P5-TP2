const DRAW_DIR = false

const TAILLE_AGENT = 10 // rayon agent 10
const MULTIPLICATEUR_FUSTRUM = 3 // rayon fustrum 30
// rayon contagion 20 (voir epidemie.js)

const NB_AGENTS = 10

let env

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  noStroke()
  fill(0)
  colorMode(HSB)

  env = new Environnement(width, height)
  for (let i = 0; i < NB_AGENTS; i++) {
    env.agents.push(new Agent())
  }
}

function draw() {
  env.computePerception()
  env.computeDecision()
  env.applyDecision()

  background(0, 0, 0, 1)
  env.show()
}

class Environnement {
  constructor(largeur, hauteur) {
    this.largeur = largeur
    this.hauteur = hauteur
    this.agents = []
  }

  computePerception() {
    for (let agent of this.agents) {
      agent.fustrum.clear()
      for (let other of this.agents) {
        if (agent === other) {
          continue
        }
        if (agent.fustrum.inside(agent.body, other.body)) {
          agent.fustrum.push(other.body)
        }
      }
    }
  }

  computeDecision() {
    for (let agent of this.agents) {
      agent.compute()
    }
  }

  applyDecision() {
    for (let agent of this.agents) {
      agent.body.update()

      if (agent.body.position.x < agent.body.size) {
        agent.body.position.x = agent.body.size
        agent.seed += 10
      } else if (agent.body.position.y < agent.body.size) {
        agent.body.position.y = agent.body.size
        agent.seed += 10
      } else if (agent.body.position.x > this.largeur - agent.body.size) {
        agent.body.position.x = this.largeur - agent.body.size
        agent.seed += 10
      } else if (agent.body.position.y > this.hauteur - agent.body.size) {
        agent.body.position.y = this.hauteur - agent.body.size
        agent.seed += 10
      }
    }
  }

  show() {
    for (let agent of this.agents) {
      agent.show()
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    if (isLooping()) {
      noLoop()
    } else {
      loop()
    }
  }
}

function mouseClicked() {
  let mouse = createVector(mouseX, mouseY)
  let target = env.agents[0]
  let cache = mouse.dist(target.body.position)
  for (let agent of env.agents) {
    if (!agent.body.canInfect()) {
      continue
    }
    if (mouse.dist(agent.body.position) < cache) {
      target = agent
      cache = mouse.dist(target.body.position)
    }
  }
  target.body.infect()
}