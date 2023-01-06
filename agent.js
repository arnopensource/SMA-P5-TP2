class Agent {
  constructor() {
    this.body = new Body()
    this.fustrum = new Fustrum()
    this.statut = "S"

    // permet un déplacement différent pour chaque agent
    this.seed = random() * 100000
  }

  compute() {
    let noiseIndex = millis() / 1000 + this.seed
    let randValue = noise(noiseIndex)
    let heading = randValue * TWO_PI
    this.body.vitesse.setHeading(heading)
    this.body.vitesse.normalize()
  }

  show() {
    let color = this.color()

    color.setAlpha(0.1)
    fill(color)
    circle(this.body.position.x, this.body.position.y, this.body.size * 2 * this.fustrum.range)

    color.setAlpha(1)
    fill(color)
    circle(this.body.position.x, this.body.position.y, this.body.size * 2)

    color = this.body.color()
    fill(color)
    circle(this.body.position.x, this.body.position.y, this.body.size * 0.7)
    
    if (DRAW_DIR) {
      stroke(255)
      strokeWeight(4)
      line(this.body.position.x, this.body.position.y, this.body.position.x + this.body.vitesse.x * this.body.size, this.body.position.y + this.body.vitesse.y * this.body.size)
      noStroke()
    }
  }

  color() {
    switch (this.statut) {
      case "S":
        return color(240, 100, 100)
      case "M":
        return color(360, 100, 100)
      case "Q":
        return color(100)
      case "D":
        return color(255)
      case "R":
        return color(100, 100, 100)
    }
  }
}
