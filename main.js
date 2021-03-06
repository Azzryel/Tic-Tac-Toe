"use strict";
const gameBoard = ( () => { 
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const newGame = () => {
        for (let i=0; i<9; i++) {
            if (gameBoard[i] != "") {
            const place = document.querySelector(`#ttt-${i}`);
            place.removeChild(place.firstChild);
            }
            gameBoard[i] = "";
        }
        game.reset();
        render();
    }

    const render = () => {
        for (let i=0; i<9; i++) {
            const place = document.querySelector(`#ttt-${i}`);
            const img = `<img src="./img/${gameBoard[i]}.png" alt="${gameBoard[i]}" class="XO">`;
            if (gameBoard[i] != "") {
            place.innerHTML = `${img}`;
            }
        }
    }

    return { gameBoard, render, newGame };
}) ();

const Player = (name, mark) => {
    const bot = false;
    let win = 0;

    return { name, mark, bot, win};
};


const game = ( () => { 
    const board = document.querySelectorAll(".ttt-place"); 
    let firstPlayed = false;
    let mark;
    let gameEnd = false;
    let drawCheck = 0;
    let botPlayed = false;

    const checkWin = () => {
        drawCheck++;
        if (( gameBoard.gameBoard[0] == "X" && gameBoard.gameBoard[1] == "X" && gameBoard.gameBoard[2] == "X"  ) 
            || ( gameBoard.gameBoard[3] == "X" && gameBoard.gameBoard[4] == "X" && gameBoard.gameBoard[5] == "X"  ) 
            || ( gameBoard.gameBoard[6] == "X" && gameBoard.gameBoard[7] == "X" && gameBoard.gameBoard[8] == "X"  )
            || ( gameBoard.gameBoard[0] == "X" && gameBoard.gameBoard[4] == "X" && gameBoard.gameBoard[8] == "X"  ) 
            || ( gameBoard.gameBoard[2] == "X" && gameBoard.gameBoard[4] == "X" && gameBoard.gameBoard[6] == "X"  )
            || ( gameBoard.gameBoard[0] == "X" && gameBoard.gameBoard[3] == "X" && gameBoard.gameBoard[6] == "X"  )
            || ( gameBoard.gameBoard[1] == "X" && gameBoard.gameBoard[4] == "X" && gameBoard.gameBoard[7] == "X"  ) 
            || ( gameBoard.gameBoard[2] == "X" && gameBoard.gameBoard[5] == "X" && gameBoard.gameBoard[8] == "X"  ) ) {
            alert(`${player1.name} wins!`)
            player1.win++;
            controls.display();
            gameEnd = true;
        }
        else if (( gameBoard.gameBoard[0] == "O" && gameBoard.gameBoard[1] == "O" && gameBoard.gameBoard[2] == "O"  ) 
            || ( gameBoard.gameBoard[3] == "O" && gameBoard.gameBoard[4] == "O" && gameBoard.gameBoard[5] == "O"  ) 
            || ( gameBoard.gameBoard[6] == "O" && gameBoard.gameBoard[7] == "O" && gameBoard.gameBoard[8] == "O"  )
            || ( gameBoard.gameBoard[0] == "O" && gameBoard.gameBoard[4] == "O" && gameBoard.gameBoard[8] == "O"  ) 
            || ( gameBoard.gameBoard[2] == "O" && gameBoard.gameBoard[4] == "O" && gameBoard.gameBoard[6] == "O"  )
            || ( gameBoard.gameBoard[0] == "O" && gameBoard.gameBoard[3] == "O" && gameBoard.gameBoard[6] == "O"  )
            || ( gameBoard.gameBoard[1] == "O" && gameBoard.gameBoard[4] == "O" && gameBoard.gameBoard[7] == "O"  ) 
            || ( gameBoard.gameBoard[2] == "O" && gameBoard.gameBoard[5] == "O" && gameBoard.gameBoard[8] == "O"  ) ) {
            alert(`${player2.name} wins!`)
            player2.win++;
            controls.display();
            gameEnd = true;
        }
        else if (drawCheck == 9) {
            alert("Draw!")
            gameEnd = true;
        }
    }

    const reset = () => {
        gameEnd = false;
        drawCheck = 0;
        firstPlayed = false;
        botPlayed = false;
        botCheck();
    }

    const botCheck = () => {
        if (player1.bot == true) botPlay();
        if (player2.bot == true) checkBotPlayed();
    }

    const checkBotPlayed = () => {
        botPlayed ? botPlayed = false : botPlayed =true;
    }

    const botPlay = () => {
        if (gameEnd == true) return;
        checkBotPlayed ();
        let position = Math.round(Math.random()  * 9 );
        while (gameBoard.gameBoard[position] != "") position = Math.round(Math.random()  * 9 );
        playMove(position);
    }

    const play = () => {

        board.forEach( (place) => {
            place.addEventListener ("click", (e) => {
                const position = e.target.getAttribute("data-place");
                checkBotPlayed();
                playMove(position);
                
            });
        });
    }

    const playMove = (position) => {
        firstPlayed ? mark = player2.mark : mark = player1.mark;
        if (gameEnd == true) return;
        if (gameBoard.gameBoard[position] == "") {
            gameBoard.gameBoard[position] = `${mark}`;
            firstPlayed ? firstPlayed = false : firstPlayed = true;
            gameBoard.render();
            checkWin();
        }
        else {
            alert("Place taken!")
        }

        if (player1.bot == true || player2.bot == true) {
            if (botPlayed == false) botPlay();
        }


    }

    return { play, botPlay, reset, checkBotPlayed };
}) ();

const controls = ( () => {

    const display = () => {
        let displayXname = document.querySelector("#x-name");
        let displayXscore = document.querySelector("#x-score");
        let displayOname = document.querySelector("#o-name");
        let displayOscore = document.querySelector("#o-score");

        displayXname.textContent = `${player1.name}`;
        displayOname.textContent = `${player2.name}`;

        displayXscore.textContent = `${player1.win}`
        displayOscore.textContent = `${player2.win}`
    }
    
    const clearForm = () => {
        playerForm.style.display = "none";
        botOptions.style.visibility = "hidden";
        buttonsHere.style.visibility = "visible";
        displayX.style.visibility = "visible";
        displayO.style.visibility = "visible";
        document.getElementById("player1").value = "";
        document.getElementById("player2").value = "";
    }

    const form = () => {
        confirmBtn.addEventListener("click", () => {
        let name1 = document.getElementById("player1").value;
        let name2 = document.getElementById("player2").value;
        let bot = document.querySelector('input[name="computer"]:checked').value;
        if (name1 == "") name1 = "Player X"
        if (name2 == "") name2 = "Player O"
        player1.name = `${name1}`
        player2.name = `${name2}`

        if (bot == "X") {
            player1.bot = true;
            game.botPlay();
        }
        if (bot == "O") {
             player2.bot = true;
             game.checkBotPlayed();
        }
        
        display();
        clearForm();
    });
    }
    return { clearForm, form, display };
}) ();

const playerForm = document.querySelector("#player-form");
const confirmBtn = document.querySelector("#confirm");
const closeBtn = document.querySelector("#close");
const buttonsHere = document.querySelector(".buttons-here");
const displayX = document.querySelector("#display-x");
const displayO = document.querySelector("#display-o");
const newGameBtn = document.querySelector("#new-game"); 
const resetGameBtn = document.querySelector("#reset-game");
const addBotBtn = document.querySelector("#addBot");
const botOptions = document.querySelector("#bot-options");
const radioBot = document.querySelectorAll(".radio-bot");
document.getElementById("botNone").checked = true;
const player1 = Player("Plyer X", "X");
const player2 = Player("Player O", "O");


newGameBtn.addEventListener("click", () => {
    gameBoard.newGame();
});

resetGameBtn.addEventListener("click", () => {
    location.reload();
});

closeBtn.addEventListener("click", () => {
    controls.clearForm();
    controls.display();
});

addBotBtn.addEventListener("click", () => {
    botOptions.style.visibility = "visible";
});


controls.form()
game.play()