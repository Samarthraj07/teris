document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const Scoredisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#Start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0

    const Ltetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2], 
        [1,width+1,width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const tTetromino =[
        [1,width,width+1, width+2],
        [1, width+1, width*2+1, width+2],
        [width, width+1, width+2, width*2+1],
        [1,width+1, width*2+1, width]
    ]
    
    const zTetromino = [
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width*2+1, width+1, width+2],
        [0, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width,width+1],
        [0, 1, width,width+1],
        [0, 1, width,width+1],
        [0, 1, width,width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width,width+1, width+2,width+3],
        [1, width+1, width*2+1, width*3+1],
        [width,width+1, width+2,width+3]
    ]

    const Tetrominos = [ Ltetromino, zTetromino, iTetromino, tTetromino, oTetromino]

    let currentPosition = 4
    let currentRotation = 0
    // randomly select tetromino 
    let random = Math.floor(Math.random()*Tetrominos.length)
     
    let current = Tetrominos[random][currentRotation]

    
    function draw () {
        current.forEach(index => { 
            squares[currentPosition + index].classList.add('tetromino')   
        })
    }

     //undraw the tetromino
    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    // assign functions to keycodes

    function control(e) {
        if(e.keyCode === 37){
            MoveLeft()
        }
        else if(e.keyCode === 38){
            rotate()
        }
        else if(e.keyCode === 39){
            MoveRight()
        }
        else if (e.keyCode === 40) {
            moveDown()
        }
    }

 document.addEventListener('keyup', control)

  //timerId = setInterval(moveDown ,1000)
 
    function moveDown()
    {
        undraw()
        currentPosition += width
        draw()
        freeze()
        addScore()
        gameOver()
    }

    //freez function 

    function freeze() {
        if(current.some( index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            
            random = nextRandom
            nextRandom = Math.floor(Math.random() * Tetrominos.length)
            current = Tetrominos[random][currentRotation]
            currentPosition = 4
            draw()
            displayshape()
        }    
    }

    //move teromino left unless there is a edge or blockage

    function MoveLeft(){
        undraw()
        const isMoveleft = current.some(index => (currentPosition + index) % width ===0)

        if(!isMoveleft){
            currentPosition -= 1
        }

        if(current.some(index => squares[currentPosition + index].classList.contains('taken')))
        {
            currentPosition += 1
        }
        draw()
    }

    
    function MoveRight(){
        undraw()
        const isMoveRight = current.some(index => (currentPosition + index) % width === width-1)

        if(!isMoveRight){
            currentPosition += 1
        }

        if(current.some(index => squares[currentPosition + index].classList.contains('taken')))
        {
            currentPosition -= 1
        }
        draw()
    }

    function rotate()
    {
        undraw()
        currentRotation ++
        if (currentRotation == current.length){
            currentRotation = 0
        }     
        current = Tetrominos[random][currentRotation]
    }
    
    
    // displaying next square in mini-grid

    const DisplaySquares = document.querySelectorAll('.mini-grid div')

    const displayWidth = 4 
    let displayIndex = 0
    
    
    const upNextTerominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2],
        [1,,displayWidth+1, displayWidth+2],
        [displayWidth*2, displayWidth*2+1, displayWidth+1, displayWidth+2],
        [0, 1, displayWidth,displayWidth+1],
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
    ]

    

    //display shape in mini-grid
    function displayshape() {
      //remove teromino from entire grid
        DisplaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
    upNextTerominoes[nextRandom].forEach( index => {
        DisplaySquares[ displayIndex + index].classList.add('tetromino')
    })
 }

 startBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        timerId = null
    }
    else{
        draw() 
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*Tetrominos.length)
        displayshape()
    }
 })

 function addScore() {
    for (let i=0 ; i< 199; i +=width){
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if (row.every(index => squares[index].classList.contains('taken'))){
            score +=10
            Scoredisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
            })
            const squareRemoved = squares.splice(i ,width)
            squares = squareRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}


function gameOver()
{
    if(current.some( index => squares[currentPosition + index].classList.contains('taken'))){
       Scoredisplay.innerHTML = 'end'
       clearInterval(timerId)
    }
}
























})



