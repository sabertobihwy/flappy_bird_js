class Game {
    constructor(landXSpeed, skyXSpeed, pipeXSpeed, tick) {
        this.bird = new Bird()
        this.land = new Land(landXSpeed)
        this.sky = new Sky(skyXSpeed)
        this.producer = new PairProducer(pipeXSpeed, tick)
        this.timer = null
    }

    eventMethod() {
        window.onkeydown = (e) => {
            if (e.key === 'Enter') {
                if (this.timer) {
                    this.endGame()
                } else {
                    this.startGame()
                }
            } else if (e.key === ' ') {
                e.preventDefault()
                this.bird.jump()
            }
        }
    }

    centerCalculate(obj1, obj2, flag) {
        if (flag === 'X') return Math.abs(obj1.left + obj1.width / 2 - (obj2.left + obj2.width / 2))
        return Math.abs(obj1.top + obj1.height / 2 - (obj2.top + obj2.height / 2))
    }


    collision(obj1, obj2) {
        return (this.centerCalculate(obj1, obj2, 'X') < (obj1.width + obj2.width) / 2) &&
            (this.centerCalculate(obj1, obj2, 'Y') < (obj1.height + obj2.height) / 2)
    }

    isGameOver() {
        if (this.bird.top === this.bird.maxY) {
            return true
        }
        for (let i = 0; i < this.producer.arr.length; i++) {
            const pair = this.producer.arr[i]
            if (this.collision(this.bird, pair.upPipe) ||
                this.collision(this.bird, pair.downPipe)) {
                console.log(this.bird.dom)
                console.log(pair.upPipe.dom)
                return true
            }
        }
        return false
    }

    startGame() {
        if (this.timer) {
            return
        }
        if (this.gameOver) {
            window.location.reload()
        }
        this.bird.startSwing()
        this.producer.startProduce()
        this.timer = setInterval(
            () => {
                this.bird.move(16 / 1000)
                this.land.move(16 / 1000)
                this.sky.move(16 / 1000)
                this.producer.move(16 / 1000)
                if (this.isGameOver()) {
                    this.endGame()
                    this.gameOver = true
                }
            }
            , 16)
    }

    endGame() {
        clearInterval(this.timer)
        this.timer = null
        this.producer.stopProduce()
    }

}

var game = new Game(-100, -80, -100, 2000)
game.eventMethod()
game.startGame()