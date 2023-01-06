class Fustrum {
  constructor() {
    this.range = MULTIPLICATEUR_FUSTRUM
    this.perceptionList = []
  }

  inside(self, target) {
    let distanceToBorder = p5.Vector.dist(self.position, target.position) - target.size
    let detectionRadius = self.size * this.range
    return distanceToBorder < detectionRadius
  }

  clear() {
    this.perceptionList = []
  }

  push(body) {
    this.perceptionList.push(body)
  }
}

