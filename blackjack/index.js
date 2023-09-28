let blackjackgame={
    'you':{'scoreSpan':'#yourScore','div':'#yourbox','score':0},
    'dealer':{'scoreSpan':'#dealerScore','div':'#dealerbox','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
  };
const YOU=blackjackgame['you'];
const DEALER=blackjackgame['dealer'];

const hitSound=new Audio('sounds/swish.m4a');
const winSound=new Audio('sounds/cash.mp3');
const lossSound=new Audio('sounds/aww.mp3');

document.querySelector('#hit').addEventListener('click',blackjackhit);
document.querySelector('#stand').addEventListener('click',dealerLogic);
document.querySelector('#deal').addEventListener('click',blackjackdeal);

function blackjackhit(){
    if(blackjackgame['isStand']===false){
    let card=randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
  }
}


function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][randomIndex];
}


function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}

function blackjackdeal(){
  if(blackjackgame['turnsOver']===true){
    blackjackgame['isStand']=false;
    let yourImages=document.querySelector('#yourbox').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealerbox').querySelectorAll('img');
    for(i=0;i<yourImages.length;i++){
      yourImages[i].remove();
    }
    for(i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
      }
    YOU['score']=0;
    DEALER['score']=0;

    document.querySelector('#yourscore').textContent=0;
    document.querySelector('#dealerscore').textContent=0;
    document.querySelector('#yourscore').style.color='#ffffff';
    document.querySelector('#dealerscore').style.color='#ffffff';
    document.querySelector('#blackjackresult').textContent="Let's Play";
    document.querySelector('#blackjackgame').style.color='black';

    blackjackgame['turnsOver']=true;
  } 
}

function updateScore(card,activePlayer){
  if(card==='A'){
   if(activePlayer['score']+blackjackgame['cardsMap'][card][1]<=21){
         activePlayer['score']+=blackjackgame['cardsMap'][card][1];
   }else {
    activePlayer['score']+=blackjackgame['cardsMap'][card][0];
   }
  }else{
    activePlayer['score'] +=blackjackgame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }else{
  document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}

function sleep(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}

async function dealerLogic(){
  blackjackgame['isStand']=true;

  while(DEALER['score']<16 && blackjackgame['isStand']===true){
   let card = randomCard();
   showCard(card,DEALER);
   updateScore(card,DEALER);
   showScore(DEALER);
   await sleep(1000);
  } 

  blackjackgame['turnsOver']=true;
  let winner= computeWinner();
  showResult(winner);
}


// compute winner and return who just won
function computeWinner(){
  let winner;

  if(YOU['score']<=21){
    // condition higher score than dealer or when dealer busts but your're 21 or under
    if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
      blackjackgame['wins']++;
      winner=YOU;
    }else if(YOU['score']<DEALER['score']){
      blackjackgame['losses']++;
      winner=DEALER;
    }else if(YOU['score']===DEALER['score']){
      blackjackgame['draws']++;
    }
      // condition: when user busts but dealer doesn't
  }else if(YOU['score']>21 && DEALER['score']<=21){
    blackjackgame['losses']++;
    winner=DEALER;
    }else if(YOU['score']>21 && DEALER['score']>21){
    blackjackgame['draws']++;
    }
  return winner;
  }

function showResult(winner) {
  let message,messageColor;
  if(blackjackgame['turnsOver']===true){
 if(winner === YOU){
   document.querySelector('#wins').textContent=blackjackgame['wins'];
    message='You Won!';
    messageColor='green';
    winSound.play();

  }else if(winner === DEALER) {
    document.querySelector('#losses').textContent=blackjackgame['losses'];
    message='You lose!';
    messageColor='red';
    lossSound.play();
  }else{
        document.querySelector('#draws').textContent=blackjackgame['draws'];
        message='Draw!';
        messageColor='black';
  }

 document.querySelector('#blackjackresult').textContent=message;
 document.querySelector('#blackjackresult').style.color=messageColor;
}
}