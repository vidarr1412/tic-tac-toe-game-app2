import React, { useState, useEffect } from 'react';
import Board from './Board';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, Draws: 0 });
  const [playerNames, setPlayerNames] = useState({ X: '', O: '' });
  const [gameStarted, setGameStarted] = useState(false);
  const [mode, setMode] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState('X');

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const currentSymbol = isX ? 'X' : 'O';

  useEffect(() => {
    const aiSymbol = playerSymbol === 'X' ? 'O' : 'X';
    if (
      mode === 'ai' &&
      !winner &&
      !isDraw &&
      ((isX && aiSymbol === 'X') || (!isX && aiSymbol === 'O'))
    ) {
      const aiMove = () => {
        const emptyIndices = squares
          .map((val, idx) => (val === null ? idx : null))
          .filter((val) => val !== null);
        if (emptyIndices.length > 0) {
          const nextSquares = squares.slice();
          nextSquares[emptyIndices[0]] = aiSymbol;
          setSquares(nextSquares);
          setIsX(!isX);
        }
      };
      setTimeout(aiMove, 500);
    }
  }, [squares, isX, winner, isDraw, mode, playerSymbol]);

  const handleClick = (i) => {
    if (winner || squares[i]) return;
    if (mode === 'ai' && (isX ? 'X' : 'O') !== playerSymbol) return;

    const nextSquares = squares.slice();
    nextSquares[i] = isX ? 'X' : 'O';
    setSquares(nextSquares);
    setIsX(!isX);
  };

  const newGame = () => {
    if (winner || isDraw) {
      const newScore = { ...score };
      if (winner) newScore[winner]++;
      else newScore.Draws++;
      setScore(newScore);
    }
    setSquares(Array(9).fill(null));
    setIsX(true);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setScore({ X: 0, O: 0, Draws: 0 });
    setIsX(true);
  };

  const goToMainMenu = () => {
    setGameStarted(false);
    setMode(null);
    setSquares(Array(9).fill(null));
    setPlayerNames({ X: '', O: '' });
    setIsX(true);
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setPlayerNames({ ...playerNames, [name]: value });
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (mode === 'pvp' && playerNames.X && playerNames.O) {
      setGameStarted(true);
    }

    if (mode === 'ai' && playerNames.X) {
      const playerIsX = Math.random() < 0.5;
      const playerSym = playerIsX ? 'X' : 'O';
      const aiSym = playerIsX ? 'O' : 'X';

      setPlayerSymbol(playerSym);
      setPlayerNames({
        [playerSym]: playerNames.X,
        [aiSym]: 'Sir Bot',
      });
      setGameStarted(true);

      if (!playerIsX) {
        setTimeout(() => {
          const firstMove = Array(9).fill(null);
          firstMove[0] = 'X';
          setSquares(firstMove);
          setIsX(false);
        }, 500);
      }
    }
  };

  const handleModeSelect = (selectedMode) => setMode(selectedMode);

  const currentPlayerName = isX ? playerNames.X : playerNames.O;
  const winnerName = winner ? playerNames[winner] : null;

  const status = winner
    ? `🏆 Winner: ${winnerName}`
    : isDraw
    ? "⚔️ It's a draw!"
    : `Next Player: ${currentPlayerName}`;

  if (!mode) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-cyan-300 font-mono space-y-6">
        <h1 className="text-4xl font-bold">Choose Game Mode</h1>
        <button className="bg-cyan-400 text-black px-6 py-2 rounded shadow-md hover:bg-cyan-300" onClick={() => handleModeSelect('pvp')}>⚔️ PVP</button>
        <button className="bg-cyan-400 text-black px-6 py-2 rounded shadow-md hover:bg-cyan-300" onClick={() => handleModeSelect('ai')}>🤖 AI MODE</button>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-cyan-300 font-mono">
        <h1 className="text-4xl mb-6">Enter Player{mode === 'pvp' ? 's' : ''} Name{mode === 'pvp' ? 's' : ''}</h1>
        <form onSubmit={handleStart} className="flex flex-col items-center space-y-4">
          <input
            type="text"
            name="X"
            className="bg-black border border-cyan-300 text-white px-4 py-2 rounded w-72 text-center"
            placeholder="Player Name"
            value={playerNames.X}
            onChange={handleNameChange}
            required
          />
          {mode === 'pvp' && (
            <input
              type="text"
              name="O"
              className="bg-black border border-cyan-300 text-white px-4 py-2 rounded w-72 text-center"
              placeholder="Player O Name"
              value={playerNames.O}
              onChange={handleNameChange}
              required
            />
          )}
          <button className="bg-cyan-400 text-black px-6 py-2 rounded shadow-md hover:bg-cyan-300" type="submit">Start Game</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-12 p-10 bg-gradient-to-br from-black via-gray-900 to-slate-900 min-h-screen text-cyan-300 font-mono">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mb-4">Tic Tac Toe</h1>
        <p className="text-xl mb-4">{status}</p>
        <Board squares={squares} onClick={handleClick} />
        <div className="flex flex-wrap gap-4 mt-4">
          {(winner || isDraw) && (
            <button onClick={newGame} className="bg-cyan-400 text-black px-4 py-2 rounded shadow hover:bg-cyan-300">New Game</button>
          )}
          <button onClick={resetGame} className="bg-yellow-400 text-black px-4 py-2 rounded shadow hover:bg-yellow-300">Reset Game</button>
          <button onClick={goToMainMenu} className="bg-red-400 text-black px-4 py-2 rounded shadow hover:bg-red-300">Main Menu</button>
        </div>
      </div>

      <div className="bg-black bg-opacity-30 border border-cyan-300 rounded p-6 shadow-lg min-w-[200px]">
        <h2 className="text-2xl mb-4">⚖️ Scoreboard</h2>
        <p>⚔️ {playerNames.X}: {score.X}</p>
        <p>🛡️ {playerNames.O}: {score.O}</p>
        <p>🏳️ Draws: {score.Draws}</p>
      </div>
    </div>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
