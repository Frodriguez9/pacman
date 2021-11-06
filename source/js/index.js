import { layout } from './layout.js'
const grid = document.querySelector('.grid')
let squares = []

const score = document.getElementById('score')
let points = 0

score.textContent = points


// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

function createBoard() {

  for (let i of layout) {
    const squere = document.createElement('div')
    if (i === 0) {
        squere.classList.add('pac-dot')
    } else if (i === 1) {
        squere.classList.add('wall')
    } else if (i === 3) {
        squere.classList.add('power-pallet')
    }

    grid.appendChild(squere)
    squares.push(squere)
  }

}

createBoard()

//starting position of pacman
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')

// set movement
let direction

// directions:
//  -1 = left
//  +1 = right
//  +28 = up
//  -28 = down

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        move(-1)

    } else if (e.key === "ArrowRight") {
       move(1)
    } else if (e.key === "ArrowDown") {
        move(28)
    } else if (e.key === "ArrowUp"){
        move(-28)
    }
})

function move(direction) {
    // check if pacman is not hitting a wall
    if (!squares[pacmanCurrentIndex + direction].classList.contains('wall')) {
        squares[pacmanCurrentIndex].classList.remove('pacman')
        pacmanCurrentIndex = pacmanCurrentIndex + direction
        squares[pacmanCurrentIndex].classList.add('pacman')
    }

    // add points if pacman eats a pac-dot
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        points += 10
        document.getElementById('score').textContent = points
    }
}
