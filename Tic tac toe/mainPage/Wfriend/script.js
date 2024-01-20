document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    let cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    const startButton = document.getElementById('startButton');

    cells.forEach(function (cell) {
        cell.addEventListener('click', function () {
            if (!cell.textContent) {
                cell.textContent = currentPlayer;

                if (checkForWinner()) {
                    alert(`${currentPlayer} wins!`);
                    showStartButton();
                    highlightWinnerCells(getWinningCombination());
                } else if (checkForDraw()) {
                    alert('It\'s a draw!');
                    showStartButton();
                } else {
                    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                }
            }
        });
    });

    startButton.addEventListener('click', function () {
        resetGame();
        hideStartButton();
    });

    function checkForWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                return true;
            }
        }

        return false;
    }

    function getWinningCombination() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                return combination;
            }
        }

        return [];
    }

    function highlightWinnerCells(combination) {
        combination.forEach(index => cells[index].classList.add('winner'));
    }

    function checkForDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function showStartButton() {
        startButton.style.display = 'inline-block';
    }

    function hideStartButton() {
        startButton.style.display = 'none';
    }

    function resetGame() {
        cells.forEach((cell, index) => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });
        currentPlayer = 'X';
    }
});
