const landDom = document.querySelector('.land')
const landStyle = getComputedStyle(landDom)
const landWidth = parseFloat(landStyle.width)
const landHeight = parseFloat(landStyle.height)
const landTop = parseFloat(landStyle.top)

class Land extends Rectangle {
    constructor(landXSpeed) {
        super(landWidth, landHeight, 0, landTop, landXSpeed, 0, landDom)
    }
    onMove() {
        if (this.left <= -this.width / 2) {
            this.left = 0
        }
    }

}

// var land = new Land()

// var timer = setInterval(() => {
//     land.move(16 / 1000)
// }, 16)

//clearInterval(timer)