const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || isGameOver) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        isGameOver = true;
    } else if (board.every(cell => cell !== '')) {
        message.textContent = 'Draw!';
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}
