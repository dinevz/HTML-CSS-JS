
let playersChoice = Array.from(document.querySelectorAll('.players-choice i'));
console.log(playersChoice);
let result = document.querySelector('.result')
let computerScoreSelect = document.querySelector('.computer-score');
let computerScore = 0;
let playerScoreSelect = document.querySelector('.player-score');
let playerScore = 0;
let player = document.querySelector('.player');
let computerResult = document.querySelector('.computer');
let showCompResult = Array.from(document.querySelectorAll('.computer-choice i'));


function computerChoice() {
    let computerChoice = Math.floor(Math.random() * 3);
    if (computerChoice == 0) {
        return 'rock'
    }
    if (computerChoice == 1) {
        return 'scissors'
    }
    
    return 'paper';
}

function gameLogic(choice) {
    let computer = computerChoice();
    player.innerHTML = '';
    computerResult.innerHTML = '';
    if(choice == 'rock') {
        if(computer == 'rock') {
            result.textContent = 'DRAW';
            player.appendChild(playersChoice[0].cloneNode(true));
            computerResult.appendChild(showCompResult[0].cloneNode(true));
        }
        if(computer == 'paper'){
            result.textContent = 'Computer wins!';
            player.appendChild(playersChoice[0].cloneNode(true));
            computerResult.appendChild(showCompResult[2].cloneNode(true));
            computerScore += 1;
            computerScoreSelect.textContent = computerScore;
        }
        if(computer == 'scissors') {
            result.textContent = 'You win!';
            player.appendChild(playersChoice[0].cloneNode(true));
            computerResult.appendChild(showCompResult[1].cloneNode(true));
            playerScore += 1;
            playerScoreSelect.textContent = playerScore;
        }
    }
    if(choice == 'scissors') {
        if(computer == 'paper'){
            result.textContent = 'You win!';
            player.appendChild(playersChoice[1].cloneNode(true));
            computerResult.appendChild(showCompResult[2].cloneNode(true));
            playerScore += 1;
            playerScoreSelect.textContent = playerScore;
        }
        if(computer == 'rock') {
            result.textContent = 'Computer wins!';
            player.appendChild(playersChoice[1].cloneNode(true));
            computerResult.appendChild(showCompResult[0].cloneNode(true));
            computerScore += 1;
            computerScoreSelect.textContent = computerScore;
        }
        if(computer == 'scissors') {  
            result.textContent = 'DRAW';
            player.appendChild(playersChoice[1].cloneNode(true));
            computerResult.appendChild(showCompResult[1].cloneNode(true));
        }
    }
    if(choice == 'paper') {
        if(computer == 'rock') {
            player.appendChild(playersChoice[2].cloneNode(true));
            computerResult.appendChild(showCompResult[0].cloneNode(true));
            result.textContent = 'You win!';
            playerScore += 1;
            playerScoreSelect.textContent = playerScore;
        }
        if(computer == 'scissors') {
            player.appendChild(playersChoice[2].cloneNode(true));
            computerResult.appendChild(showCompResult[1].cloneNode(true));
            result.textContent = 'Computer wins!';
            computerScore += 1;
            computerScoreSelect.textContent = computerScore;
        }
        if(computer == 'paper') {
            result.textContent = 'DRAW';
            player.appendChild(playersChoice[2].cloneNode(true));
            computerResult.appendChild(showCompResult[2].cloneNode(true));
        }
    }
}

playersChoice.forEach(choice => {
    choice.addEventListener('click', (e) => {
        gameLogic(e.currentTarget.id);
    })
})