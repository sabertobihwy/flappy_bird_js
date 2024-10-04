const container = document.querySelector('.container')
const containerStyle = getComputedStyle(container)
const containerHeight = parseFloat(containerStyle.height)

class Rectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width
        this.height = height
        this.top = top
        this.left = left
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
        this.dom = dom
        this.render()
    }

    move(duration) { // seconds
        this.left += this.xSpeed * duration
        this.top += this.ySpeed * duration
        if (this.onMove) { // 子类
            this.onMove()
        }
        this.render()
    }
    render() {
        this.dom.style.height = this.height + 'px'
        this.dom.style.width = this.width + 'px'
        this.dom.style.top = this.top + 'px'
        this.dom.style.left = this.left + 'px'
        container.appendChild(this.dom)
    }
}