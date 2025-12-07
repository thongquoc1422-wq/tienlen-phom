import PlayerBox from "../models/Player";

function PhomScreen({ goHome }) {
  const players = [
    { id: 1, name: "Player 1", score: 0 },
    { id: 2, name: "Player 2", score: 0 },
    { id: 3, name: "Player 3", score: 0 },
    { id: 4, name: "Player 4", score: 0 },
  ];

  return (
    <div className="app-phone">
      <button className="back-btn" onClick={goHome}>◀ Trở về</button>

      <div className="players-grid">
        {players.map((p) => (
          <PlayerBox key={p.id} player={p} />
        ))}
      </div>
    </div>
  );
}

export default PhomScreen;
