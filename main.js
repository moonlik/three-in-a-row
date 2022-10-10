import './style.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'
// <a href="https://www.freepik.com/free-vector/animal-logo-element-vector-line-art-animal-illustration-set_20775645.htm#page=5&query=cat&position=22&from_view=keyword">Image by rawpixel.com</a> on Freepik


document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const width = 8
  const squares = []
  let score = 0

  const squareColors = [
    'url(/cat.png)',
    'url(/dog.png)',
    'url(/turtle.png)',
    'url(/pigeon.png)',
    'url(/rabbit.png)',
    'url(/elephant.png)'
  ]

  function createBoard() {
    for(let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.setAttribute('draggable', true)
      square.setAttribute('id', i)
      
      let randomColor = Math.floor(Math.random() * squareColors.length)
      square.style.backgroundImage = squareColors[randomColor]
      grid.appendChild(square)
      squares.push(square)
    }
  }

  createBoard()

  let colorBeingDragged
  let colorBeingReplaced
  let squareIdBeingDragged
  let squareIdBeingReplaced

  squares.forEach(square => square.addEventListener('dragstart', dragStart))
  squares.forEach(square => square.addEventListener('dragend', dragEnd))
  squares.forEach(square => square.addEventListener('dragover', dragOver))
  squares.forEach(square => square.addEventListener('dragenter', dragEnter))
  squares.forEach(square => square.addEventListener('dragleave', dragLeave))
  squares.forEach(square => square.addEventListener('drop', dragDrop))

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(this.id, 'dragstart')
  }

  function dragOver(e) {
    e.preventDefault()
    console.log(this.id, 'dragover')
  }

  function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, 'dragenter')
  }

  function dragLeave() {
    console.log(this.id, 'dragleave')
  }

  function dragDrop() {
    console.log(this.id, 'dragdrop')
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
  }

  function dragEnd() {
    console.log(this.id, 'dragend')

    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
  }

  function moveDown() {
    for (let i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === '') {
        squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
        squares[i].style.backgroundImage = ''

        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)

        if (isFirstRow && squares[i].style.backgroundImage === '') {
          let randomColor = Math.floor(Math.random() * squareColors.length)
          squares[i].style.backgroundImage = squareColors[randomColor]
        }
      }
    }
  }

  function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i+1, i+2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]

      if (notValid.includes(i)) continue

      if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank) {
        score += 3
        scoreDisplay.innerHTML = score
        rowOfThree.forEach(index => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }

  checkRowForThree()

  function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
      let columnOfThree = [i, i+width, i+width*2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor) && !isBlank) {
        score += 3
        scoreDisplay.innerHTML = score
        columnOfThree.forEach(index => {
          squares[index].style.backgroundImage = ''
        })
      }
    }
  }

  checkColumnForThree()

  window.setInterval(function() {
    checkRowForThree()
    checkColumnForThree()
    moveDown()
  }, 100)

})
