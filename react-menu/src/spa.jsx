import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
        }
        return null;
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(square => square !== null);

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = xIsNext ? "X" : "O";
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    return (
        <div>
            <h2>Amőba (Tic-Tac-Toe)</h2>
            <h3>{winner ? `Nyertes: ${winner}` : isDraw ? "Döntetlen!" : `Következik: ${xIsNext ? "X" : "O"}`}</h3>
            <div className="board">
                {board.map((square, i) => (
                    <button key={i} className="square" onClick={() => handleClick(i)}>{square}</button>
                ))}
            </div>
            <button className="reset-btn" onClick={() => {setBoard(Array(9).fill(null)); setXIsNext(true);}}>Új játék</button>
        </div>
    );
}

function NumberGuesser() {
    const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("Gondoltam egy számra 1 és 100 között.");
    const [attempts, setAttempts] = useState(0);
    const [isWon, setIsWon] = useState(false);

    const handleGuess = (e) => {
        e.preventDefault();
        if (isWon || guess === "") return;
        const userGuess = parseInt(guess, 10);
        setAttempts(attempts + 1);
        if (userGuess === targetNumber) { setMessage(`Gratulálok! Eltaláltad ${attempts + 1} próbálkozásból!`); setIsWon(true); }
        else if (userGuess < targetNumber) { setMessage("Nagyobb számra gondoltam."); }
        else { setMessage("Kisebb számra gondoltam."); }
        setGuess("");
    };

    return (
        <div>
            <h2>Számkitaláló</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{message}</p>
            <p>Próbálkozások száma: {attempts}</p>
            <form onSubmit={handleGuess}>
                <input type="number" className="guess-input" value={guess} onChange={(e) => setGuess(e.target.value)} disabled={isWon} min="1" max="100" />
                <button type="submit" className="guess-btn" disabled={isWon}>Tippelek</button>
            </form>
            {isWon && <button className="reset-btn" onClick={() => {setTargetNumber(Math.floor(Math.random()*100)+1); setGuess(""); setMessage("Gondoltam egy számra 1 és 100 között."); setAttempts(0); setIsWon(false);}}>Új játék</button>}
        </div>
    );
}

function App() {
    const [activeApp, setActiveApp] = useState("tictactoe");
    return (
        <div className="app-container">
            <div className="spa-nav">
                <button className={activeApp === "tictactoe" ? "active" : ""} onClick={() => setActiveApp("tictactoe")}>Amőba</button>
                <button className={activeApp === "guesser" ? "active" : ""} onClick={() => setActiveApp("guesser")}>Számkitaláló</button>
            </div>
            <hr style={{marginBottom: '2rem', border: '1px solid #ecf0f1'}} />
            {activeApp === "tictactoe" && <TicTacToe />}
            {activeApp === "guesser" && <NumberGuesser />}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);