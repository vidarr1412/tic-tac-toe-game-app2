import React, { useState, useEffect } from 'react';
import Board from './Board';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-cyan-300 font-mono">
      <div className="bg-black/30 border border-cyan-400 rounded-2xl shadow-xl px-10 py-12 text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">Choose Game Mode</h1>

        <div className="flex flex-col gap-4">
          <Button
            variant="default"
            className="rounded-full px-6 py-3 text-lg shadow-lg bg-cyan-500 hover:bg-cyan-400 text-black"
            onClick={() => handleModeSelect("pvp")}
          >
            ⚔️ PVP
          </Button>

          <Button
            variant="default"
            className="rounded-full px-6 py-3 text-lg shadow-lg bg-cyan-500 hover:bg-cyan-400 text-black"
            onClick={() => handleModeSelect("ai")}
          >
            🤖 AI MODE
          </Button>
        </div>
      </div>
    </div>
  );
}

  if (!gameStarted) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 text-cyan-300 font-mono">
      <div className="bg-black/30 border border-cyan-400 rounded-2xl shadow-xl px-10 py-12 text-center space-y-6 w-[320px]">
        <h1 className="text-3xl font-bold text-white">
          Enter Player{mode === "pvp" ? "s" : ""} Name{mode === "pvp" ? "s" : ""}
        </h1>

        <form onSubmit={handleStart} className="flex flex-col gap-4">
          <Input
            type="text"
            name="X"
            placeholder="Player Name"
            value={playerNames.X}
            onChange={handleNameChange}
            required
            className="bg-gray-900 border-cyan-400 text-white placeholder-cyan-300 rounded-lg"
          />
          {mode === "pvp" && (
            <Input
              type="text"
              name="O"
              placeholder="Player O Name"
              value={playerNames.O}
              onChange={handleNameChange}
              required
              className="bg-gray-900 border-cyan-400 text-white placeholder-cyan-300 rounded-lg"
            />
          )}

          <Button
            type="submit"
            className="rounded-full px-6 py-3 text-lg shadow-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
          >
            Start Game
          </Button>
        </form>
      </div>
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
            <Button onClick={newGame}>New Game</Button>
          )}
          <Button variant="outline" onClick={resetGame}>Reset Game</Button>
    <div className="flex justify-center">
  <Button
    variant="destructive"
    onClick={goToMainMenu}
    className="px-6 py-3 text-white bg-red-600 hover:bg-red-500 rounded-full shadow-lg transition duration-200 ease-in-out"
  >
    🏠 Main Menu
  </Button>
</div>

        </div>
      </div>

      <Card className="min-w-[200px] text-white bg-opacity-10 border-cyan-300">
        <CardContent className="p-6">
          <h2 className="text-2xl mb-4">⚖️ Scoreboard</h2>
          <p>⚔️ {playerNames.X}: {score.X}</p>
          <p>🛡️ {playerNames.O}: {score.O}</p>
          <p>🏳️ Draws: {score.Draws}</p>
        </CardContent>
      </Card>
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
