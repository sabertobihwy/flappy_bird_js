const skydom = document.querySelector('.sky')
const skyStyle = getComputedStyle(skydom)
const skyWidth = parseFloat(skyStyle.width)
const skyHeight = parseFloat(skyStyle.height)

class Sky extends Rectangle {
    constructor(skyXSpeed) {
        super(skyWidth, skyHeight, 0, 0, skyXSpeed, 0, skydom)
    }
    onMove() {
        if (this.left <= -this.width / 2) {
            this.left = 0
        }
    }

}

// var sky = new Sky()

// var timer = setInterval(() => {
//     sky.move(16 / 1000)
// }, 16)

//clearInterval(timer)