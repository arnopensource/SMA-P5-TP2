class Body {
  constructor() {
    this.size = TAILLE_AGENT
    this.position = createVector(random(width), random(height))
    this.vitesse = p5.Vector.random2D()

    this.statutInterne = "S"
    this.timer = 0

    this.contacts = {}
  }

  update(n) {
    n = n ?? 1
    for (let i = 0; i < n; i++) {
      this.position.add(this.vitesse)
    }

    if (this.statutInterne == "I") {
      this.timer--
      if (this.timer < 0) {
        this.statutInterne = "M"
        this.timer = PARAMS.DUREE_DECES
      }
    }

    if (this.contagieux()) {
      for (let other of env.agents) {
        if (!other.body.canInfect()) {
          continue
        }
        if (this.contacts[other] === true) {
          console.log("déjà rencontré")
          continue
        }
        let dist = this.position.dist(other.body.position) - other.body.size
        if (dist < PARAMS.DISTANCE_MIN_CONTAGION) {
          this.contacts[other] = true
          if (random() < PARAMS.POURCENT_CONTAGION / 100) {
            other.body.infect()
          }
        }
      }
    }
  }

  canInfect() {
    return this.statutInterne == "S"
  }

  infect() {
    if (this.statutInterne != "S") {
      return
    }
    this.statutInterne = "I"
    this.timer = PARAMS.DUREE_INCUBATION
  }

  contagieux() {
    if (this.statutInterne == "M") {
      return true
    }
    if (this.statutInterne == "I" && this.timer < PARAMS.DUREE_INCUBATION - PARAMS.DUREE_PRE_CONTAGION) {
      return true
    }
    return false
  }

  collide(body) {
    let d = p5.Vector.dist(this.position, body.position)
    d = d - this.size - body.size
    if (d >= 0) {
      return 0
    } else {
      return -d
    }
  }

  color() {
    switch (this.statutInterne) {
      case "S":
        return color(240, 100, 100)
      case "M":
        return color(360, 100, 100)
      case "I":
        return color(40, 100, 100)
      case "D":
        return color(255)
      case "R":
        return color(100, 100, 100)
    }
  }

}