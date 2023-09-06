
//1. Deposit some money
const prompt = require("prompt-sync")();

//Declare variables
const ROWS =3; // const global variables in all caps
const COLS = 3;

const SYMBOLS_COUNT = { //object allows keys or properties mapped with different values
     A: 2,
     B: 4,
     C: 6,
     D: 8
}

const SYMBOLS_VALUES = { //multiplier or value of each symbol relative to what it will be multiplied by
     A: 5,
     B: 4,
     C: 3,
     D: 2
}

const deposit = () => {

    while(true) {

        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

//2. Determine number of linces to bet on

const getNumberOfLines = () => {

    while(true) {

        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }

};


//3. Collect a bet amount
const getBet = (balance, lines) => {

    while(true) {

        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.");
        } else {
            return numberBet;
        }
    }

}

//4. Spin the slot machine, randomizer based on the counts & determine a winner
const spin = () => {
    //all possible symbols put in array, ranomly selected and then removed from array with each use while each column is generated
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol); //add symbols into symbol array
        }
    }
    const reels = []; // all the different reels
    for ( let i = 0; i < COLS; i++) { //loop through the reels we have represented by the number of columns
        reels.push([]);
        const reelSymbols = [...symbols];

        for ( let j = 0; j < ROWS; j++) { //loop through rows, all of the rows are the number of symbols for each reel, randomly generate available symbol
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol); // push into current reel we are working on
                reelSymbols.splice(randomIndex, 1); //remove from available reels so it won't be reselected

        }
    }

    return reels;
}

//5. Check if the user won
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols) {
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]]
        }
    }

    return winnings;
}

//6. give the user their winnings
const game = () => {
    let balance = deposit();
    while (true) {
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if(balance <= 0) {
            console.log("You ran out of money!");
            break;
        }
//7. Play again
        const playAgain = prompt("Do you want to play again (y/n)?");

        if(playAgain != "y") break;


    }
}

game();

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin()
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, numberOfLineslines)
console.log("You won, $" + winnings.toString())