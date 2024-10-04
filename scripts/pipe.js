const containerWidth = container.clientWidth

class Pipe extends Rectangle {
    constructor(height, top, xSpeed, dom) {
        super(52, height, containerWidth, top, xSpeed, 0, dom)
    }

    onMove() { // remove from dom
        if (this.left <= -this.width) {
            console.log('remove')
            this.dom.remove()
        }
    }
}

getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const spaceBetween = 150
const minPipeH = 80
const maxPipeH = landTop - minPipeH - spaceBetween

class PipePair {
    // generate dom
    constructor(xSpeed) {
        const upPipeHeight = getRandom(minPipeH, maxPipeH)
        const downPipeHeight = landTop - spaceBetween - upPipeHeight
        const downPipeTop = landTop - downPipeHeight
        const upPipeDom = document.createElement('div')
        upPipeDom.className = `pipe up`
        this.upPipe = new Pipe(upPipeHeight, 0, xSpeed, upPipeDom)
        const downPipeDom = document.createElement('div')
        downPipeDom.className = `pipe down`
        this.downPipe = new Pipe(downPipeHeight, downPipeTop, xSpeed, downPipeDom)
        container.appendChild(upPipeDom)
        container.appendChild(downPipeDom)
    }

    get isUseLess() { // remove from arr 
        return this.upPipe.left <= -this.upPipe.width
    }

    move(duration) {
        this.upPipe.move(duration)
        this.downPipe.move(duration)
    }

}

class PairProducer {
    constructor(xSpeed, tick) {
        this.arr = [] // push pipePair
        this.timer = null // generate pipePair dom
        this.tick = tick // generate intervals 
        this.xSpeed = xSpeed
    }

    move(duration) {
        this.arr.forEach(pair => pair.move(duration))
    }

    startProduce() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            const pair = new PipePair(this.xSpeed)
            for (let i = 0; i < this.arr.length; i++) {
                if (this.arr[i].isUseLess) {
                    this.arr.splice(i, 1)
                    i--
                }
            }
            this.arr.push(pair)

        }, this.tick)
    }

    stopProduce() {
        clearInterval(this.timer)
        this.timer = null
    }

}

// var producer = new PairProducer(-100, 2000)
// producer.startProduce() // every 300 ms -> generate a pipe-pair

// var timer = setInterval(() => {
//     producer.move(16 / 1000)
// }, 16)
