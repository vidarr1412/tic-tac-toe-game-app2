const Board = ({ squares, onClick }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {squares.map((square, i) => (
        <div
          key={i}
          onClick={() => onClick(i)}
          className="w-24 h-24 bg-cyan-950 border-2 border-cyan-300 text-cyan-300 text-4xl font-bold flex justify-center items-center cursor-pointer hover:bg-cyan-900 transition-all"
        >
          {square}
        </div>
      ))}
    </div>
  );
};

export default Board;
