import { layout } from './layout.js'
const grid = document.querySelector('.grid')
const gridHight = 28
const gridLength = 28
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
        squere.classList.add('power-pellet')
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
let control

  // control:
  //  -1 = left
  //  +1 = right
  //  +28 = up
  //  -28 = down

function updatePadmanPosition(control=null, atBorder=null) {
      // remove pacman from current position in UI
      squares[pacmanCurrentIndex].classList.remove('pacman')

      // assign pacman's new postion
      if (atBorder==="right") { // when pacman is at right border with secret tunel
        pacmanCurrentIndex -= (gridLength - 1)
      } else if (atBorder==="left") { // when pacman is at left border with secret tunel
        pacmanCurrentIndex += (gridLength - 1)
      } else { // when padman is anywhere in the path
        pacmanCurrentIndex += control
      }

      // assign pacman to its new postion in UI
      squares[pacmanCurrentIndex].classList.add('pacman')
}


function move(direction) {
    let potentialNewPostion = squares[pacmanCurrentIndex + direction]
    // check if path contains "secret tunnel"
    //    Passing throughout right border
    if ((pacmanCurrentIndex + 1) % 28 === 0 && direction === 1) {
      updatePadmanPosition(null, "right")
    } //    Passing throughout Left border
    else if (pacmanCurrentIndex % 28 === 0 && direction === -1) {
      updatePadmanPosition(null, "left")
    }// check if pacman is not hitting a wall
    else if (!potentialNewPostion.classList.contains('wall')) {
        updatePadmanPosition(direction)
    }

}


document.addEventListener("keydown", (e) => {

    switch (e.key) {
      case "Up": // IE/Edge
        move(-28)
      case "ArrowUp":
        move(-28)
        break

      case "Right": // IE/Edge
        move(1)
      case "ArrowRight":
        move(1)
        break

      case "Down":  // IE/Edge
        move(28)
      case "ArrowDown":
        move(28)
        break

      case "Left": // IE/Edge
        move(-1)
      case "ArrowLeft":
        move(-1)
        break
    }

    // add points if pacman eats a pac-dot
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        points += 10
        document.getElementById('score').textContent = points
    }

})
