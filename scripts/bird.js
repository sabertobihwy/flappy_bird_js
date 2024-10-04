const birdDom = document.querySelector('.bird')
const birdStyle = getComputedStyle(birdDom)
const birdWidth = parseFloat(birdStyle.width)
const birdHeight = parseFloat(birdStyle.height)
const birdLeft = parseFloat(birdStyle.left)
const birdTop = parseFloat(birdStyle.top)

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom)
        this.a = 1500
        this.swingNum = 1
        this.maxY = containerHeight - landHeight - this.height
        this.timer = null // swing timer 
    }

    startSwing() {
        if (this.timer) return
        this.timer = setInterval(() => {
            this.swingNum++;
            if (this.swingNum === 4) {
                this.swingNum = 1
            }
            this.render()
        }, 300)
    }

    stopSwing() {
        clearInterval(this.timer)
        this.timer = null
    }

    onMove() {
        if (this.top > this.maxY) {
            this.top = this.maxY
        } else if (this.top < 0) {
            this.top = 0
        }
    }

    render() {
        super.render()
        this.dom.className = `bird swing${this.swingNum}`
    }

    move(duration) {
        super.move(duration)
        this.ySpeed += this.a * duration // second
    }

    jump() {
        this.ySpeed = -350
    }


}

// var b = new Bird()
// b.startSwing()
// timer = setInterval(() => {
//     b.move(16 / 1000)
// }, 16)

// b.stopSwing()
