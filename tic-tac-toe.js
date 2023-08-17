const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const button = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialize a game
function initGame(){
   currentPlayer = "X";
   gameGrid = ["","","","","","","","",""];
   //UI pe empty krna hai boxes ko
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //green colour ko bhi remove krna hai
        box.classList = `box box${index+1}`;
    });
   button.classList.remove("active");
   gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
     if(currentPlayer === "X"){
        currentPlayer = "0";
     }
     else{
        currentPlayer = "X";
     }
     //UI update
     gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
     let answer = "";
     //all 3 boxes should be non-empty and exactly same in value
     winningPositions.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
               
            //check if winner is X/0
            if(gameGrid[position[0]] === "X")
              answer = "X";

            else
              answer = "0";

              //disable pointer event
              boxes.forEach((box) =>{
                box.style.pointerEvents="none";
              });

              //now we know X/0 is a winner
              boxes[position[0]].classList.add("win");
              boxes[position[1]].classList.add("win");
              boxes[position[2]].classList.add("win");
       }
     });
     //it means we have a winner
     if(answer != ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        button.classList.add("active");
        return;
     }

     //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
     if(gameGrid[index]===""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap kro turn ko
        swapTurn();
        //check koi jeet toh nhi gya
        checkGameOver();
     }
}

boxes.forEach((box, index) =>{
     box.addEventListener("click", ()=>{
        handleClick(index);
     })
});

button.addEventListener("click",initGame);

