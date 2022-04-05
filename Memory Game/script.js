let url = 'https://api.coingecko.com/api/v3'; 
let moves = 0;
let arr = [];

async function getData(url) {
    try {
        const response = await fetch(`${url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json();
        data.forEach(element => {
            arr.push(element.image);
        })
    } catch (e) {
        console.log('getData: ', e);
    }

}
getData(url); // getting cards back from coingecko top cryptos by marketcap


const createCard = (num) => { // num creates back of cards
    let classContainer = document.createAttribute('class');
    classContainer.value = 'card-container';
    let card = document.createElement('div');
    card.setAttributeNode(classContainer);

    let classFlipper = document.createAttribute('class');
    classFlipper.value = 'flipper';
    let flipper = document.createElement('div');
    flipper.setAttributeNode(classFlipper);

    let classFront = document.createAttribute('class');
    classFront.value = 'front';
    let frontCard = document.createElement('div');
    let imgFront = document.createElement('img');
    imgFront.src = './card-front.jpg'
    frontCard.appendChild(imgFront);
    frontCard.setAttributeNode(classFront);

    let classBack = document.createAttribute('class');
    classBack.value = 'back';
    let backCard = document.createElement('div');
    let imgBack = document.createElement('img');
    imgBack.src = `${arr[num]}`;
    backCard.appendChild(imgBack);
    backCard.setAttributeNode(classBack);

    flipper.appendChild(frontCard);
    flipper.appendChild(backCard);
    card.style.order = Math.floor(Math.random() * 1000); // shuffle cards, check how order works
    card.appendChild(flipper);

    return card;
};

const createBoard = (level) => {
    let board = document.querySelector('.board');
    if(level == 'Easy') {
        board.innerHTML = '';
        for(let i = 0; i <= 7; i++) {
            board.appendChild(createCard(i));
            board.appendChild(createCard(i));
        };
        let cards = document.querySelectorAll('.card-container');
        
        cards.forEach(card => {
            
            card.style.width = '22%';
            card.style.height = '20%';
            card.addEventListener('click', (e) => {
                gameLogic(e, cards);
            ;})
        });
    } else if (level == 'Medium') {
        board.innerHTML = '';
        for(let i = 0; i <= 11; i++){
            board.appendChild(createCard(i));
            board.appendChild(createCard(i));   
            };
        
        let cards = document.querySelectorAll('.card-container');
        cards.forEach(card => {
            card.style.width = '15%';
            card.style.height = '15%';
            card.addEventListener('click', (e) => {
                gameLogic(e, cards);
            ;})
        });
    } else {
        board.innerHTML = '';
        for(let i = 0; i <= 14; i++){
        board.appendChild(createCard(i));
        board.appendChild(createCard(i));
        };
        let cards = document.querySelectorAll('.card-container');
        cards.forEach(card => {
            
            card.style.width = '15%';
            card.style.height = '15%';
            card.addEventListener('click', (e) => {
                gameLogic(e, cards);
            ;})
        });
    
    }
};

const gameLogic = (e, cards) => {
    if(document.querySelectorAll('.turned').length < 2) {
        if(e.currentTarget.firstElementChild.className != 'hidden') {
            turnFront(e);
        }
        let turned = document.querySelectorAll('.turned')
        if (turned.length == 2) {
            moves += 1;
            if(turned[0].firstChild.lastChild.innerHTML == turned[1].firstChild.lastChild.innerHTML) { // if 1st clicked and 2nd clicked are the same make them hidden
             
                setTimeout(() => {
                    turned[0].firstChild.className = 'hidden';
                    turned[1].firstChild.className = 'hidden';
                    if(document.querySelectorAll('.hidden').length == document.querySelectorAll('.card-container').length){
                        let board = document.querySelector('.board');
                        board.innerHTML = ``;
                        let congrats = document.createElement('h3');
                        congrats.textContent = `You won in ${moves} moves!`
                        board.appendChild(congrats);
                        moves = 0;
                    }
                }, 1000);
            };
            
            setTimeout(() => {
                turnBack(cards);
            }, 1000);
        }
        
    }

};


const turnFront = (e) => {
    e.currentTarget.firstElementChild.style.transform = 'rotateY(180deg)';
    e.currentTarget.className = 'card-container turned';
}
const turnBack = (cards) => { // turn cards back function
    cards.forEach(card => {
        card.firstElementChild.style.transform = 'rotateY(0deg)';
        card.className = 'card-container';
    });
};

const generateBoard = (level) => { // generate board based on difficulty
    if(level.value == 'Easy') { 
        createBoard(level.value);

     } else if (level.value == 'Medium') {
        createBoard(level.value);
        
     } else {
        createBoard(level.value);
        }
};

let startGame = document.getElementById('reset');
startGame.addEventListener('click', (e) => {
    e.preventDefault();
    let level = document.getElementById('level');
    generateBoard(level);
});
