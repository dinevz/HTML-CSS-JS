let player = ["url('./letterX.png')", "url('./letterO.png')"];
let turns;

const createBoard = () => {
    turns = 0;
    let div = document.getElementById('board-container');
    div.innerHTML = '';
    let board = document.createElement('div');
    board.className = 'board';
    for (let i = 0; i < 9; i++) {
        let square = document.createElement('div');
        square.className = `square`;
        board.appendChild(square);
        
    }
    div.appendChild(board);
    let [...arr] = document.querySelectorAll('.square');
    arr.forEach((item) => {
        item.addEventListener('click', playGame);
    });
}


const endGame = (board, turns) => {
    board.forEach((element, fIndex) => {
        element.forEach((square, sIndex) => {
            if(!square.style.backgroundImage) {
                board[fIndex][sIndex] = false;
            } else {
                board[fIndex][sIndex] = square.style.backgroundImage;
            }
        });
    });
    const gameOver = () => {
        let [...arr] = document.querySelectorAll('.square');
        arr.forEach((item) => {
            item.removeEventListener('click', playGame);
        });
        player = ["url('./letterX.png')", "url('./letterO.png')"];
        turns = 0;
    }
    let firstDiagonal = [];
    let secondDiagonal = [];
    let firstRow = [...board[0]];
    let secondRow = [...board[1]];  
    let thirdRow = [...board[2]];
    let firstColumn = [];
    let secondColumn = [];
    let thirdColumn = [];
    
    let firstIndex = 0;
    let secondIndex = board[0].length - 1;
    board.forEach(arr => {
        
        firstColumn.push(arr[0]);
        secondColumn.push(arr[1]);
        thirdColumn.push(arr[2]);
        firstDiagonal.push(arr[firstIndex++]);
        secondDiagonal.push(arr[secondIndex--]);

    });
    let firstDiagonalSet = new Set(firstDiagonal);
    let secondDiagonalSet = new Set(secondDiagonal);
    let firstRowSet = new Set(firstRow);
    let secondRowSet = new Set(secondRow);
    let thirdRowSet = new Set(thirdRow);
    let firstColumnSet = new Set(firstColumn);
    let secondColumnSet = new Set(secondColumn);
    let thirdColumnSet = new Set(thirdColumn);
    if(firstDiagonalSet.size == 1 && !firstDiagonalSet.has(false)) {
        setTimeout(() => {
            alert(`Player ${[...firstDiagonalSet][0].slice(13, 14)} wins`);
        }, 500)
            
        gameOver();
    } else if(secondDiagonalSet.size == 1 && !secondDiagonalSet.has(false)) {
        setTimeout(() => {
            alert(`Player ${[...secondDiagonalSet][0].slice(13, 14)} wins`);
        }, 500)
        gameOver();
    } else if(firstRowSet.size == 1 && !firstRowSet.has(false)) {
        setTimeout(() => {
            alert(`Player ${[...firstRowSet][0].slice(13, 14)} wins`);
        }, 500)
        gameOver();
    } else if(secondRowSet.size == 1 && !secondRowSet.has(false)) {
        setTimeout(() => {
            alert(`Player ${[...secondRowSet][0].slice(13, 14)} wins`);
        }, 500)
        gameOver();
    } else if(thirdRowSet.size == 1 && !thirdRowSet.has(false)) {
        setTimeout(() => {
            alert(`Player ${[...thirdRowSet][0].slice(13, 14)} wins`);
        }, 500)
        gameOver();
    } else if(firstColumnSet.size == 1 && !firstColumnSet.has(false)) {
        setTimeout(() => {
            alert(`Player ${[...firstColumnSet][0].slice(13, 14)} wins`);
        }, 500)
        gameOver();
    } else if(secondColumnSet.size == 1 && !secondColumnSet.has(false)) {
        setTimeout(() => {
            alert(`Player ${[...secondColumnSet][0].slice(13, 14)} wins`);
        }, 500)
        gameOver();
    } else if(thirdColumnSet.size == 1 && !thirdColumnSet.has(false)) {
        setTimeout(() => {
            alert(`Player ${[...thirdColumnSet][0].slice(13, 14)} wins`);
        }, 500)
        gameOver();
    }
    if(turns == 9) {
        setTimeout(() => {
            alert("The game ended! Nobody wins :(");
        }, 500)
        gameOver();
    }
}

const playGame = (event) => {
    let [...arr] = document.querySelectorAll('.square');
    const arrayToMatrix = (array, columns) => Array(Math.ceil(array.length / columns)).fill('').reduce((acc, cur, index) => {
     return [...acc, [...array].splice(index * columns, columns)]
    }, [])
    arr = arrayToMatrix(arr, 3);
    if(!event.currentTarget.style.backgroundImage) {
        event.currentTarget.style.backgroundImage = player[0];
        [player[0], player[1]] = [player[1], player[0]]; // switching players turns
        turns++;
    } else {
        alert("This place is already taken. Please choose another!");
    }
    endGame(arr, turns);
       
}


let button = document.getElementById('btn');
button.addEventListener('click', createBoard);