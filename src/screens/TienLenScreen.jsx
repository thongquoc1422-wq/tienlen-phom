import { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import PlayerCardDetail from "../components/PlayerCardDetail";
import RoundResultModal from "../components/RoundResultModal";
import tableImg from "../assets/images/table.jpg";
import { players as allPlayers } from "../data/players";
import Player from "../models/Player";

function TienLenScreen({ goHome }) {
  const [playerList, setPlayerList] = useState(allPlayers);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [positions, setPositions] = useState({});
  const [showRoundModal, setShowRoundModal] = useState(false);

  const togglePlayer = (player) => {
    const isSelected = selectedPlayers.includes(player.id);
    if (isSelected) {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== player.id));
      return;
    }
    if (selectedPlayers.length >= 4) {
      alert("Bạn chỉ được chọn tối đa 4 người!");
      return;
    }
    setSelectedPlayers([...selectedPlayers, player.id]);
  };

  const startGame = () => {
    const newPositions = {};
    selectedPlayers.forEach((id) => {
      const el = document.getElementById(`player-${id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        newPositions[id] = {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        };
      }
    });
    setPositions(newPositions);
    setGameStarted(true);
  };

  // ⭐ FIX: CỘNG ĐIỂM ĐÚNG KIỂU CLASS
  const handleRoundResult = (roundData) => {
  const { mode, results } = roundData;

  const updatedPlayers = playerList.map((player) => {

    // ⚠️ Nếu player không thuộc 4 người được chọn → giữ nguyên
    if (!selectedPlayers.includes(player.id)) return player;

    const r = results[player.id];
    if (!r) return player;

    // 🔥 LUÔN TẠO LẠI ĐÚNG CLASS PLAYER TRƯỚC KHI XỬ LÝ
    const realPlayer = new Player(
      player.id,
      player.name,
      player.avatar,
      player.lastRank,
      player.currentScore
    );

    // ⭐ ÁP DỤNG ĐIỂM
    realPlayer.applyRoundScore({
    mode,
    rank: r.rank,
    heoDo: r.heoDo || 0,
    heoDen: r.heoDen || 0,
    });
    return realPlayer; // ⭐ TRẢ LẠI ĐÚNG INSTANCE PLAYER
  });

  setPlayerList(updatedPlayers);
  setShowRoundModal(false); // 🔥 Đóng modal
};

  return (
    <div className="app-phone" style={{ backgroundImage: `url(${tableImg})` }}>
      <button className="back-btn" onClick={goHome}>◀ Trở về</button>

      {!gameStarted && (
        <div className="players-grid">
          {playerList.map((player) => (
            <div
              key={player.id}
              id={`player-${player.id}`}
              style={{ cursor: "pointer" }}
              onClick={() => togglePlayer(player)}
            >
              <PlayerCard
                player={player}
                selected={selectedPlayers.includes(player.id)}
              />
            </div>
          ))}
        </div>
      )}

      {selectedPlayers.length === 4 && !gameStarted && (
        <div className="start-fixed-btn" onClick={startGame}>
          Bắt đầu ván đấu
        </div>
      )}

      {gameStarted && (
        <>
          <button
            className="start-fixed-btn"
            style={{ bottom: 20 }}
            onClick={() => setShowRoundModal(true)}
          >
            Nhập kết quả ván đấu
          </button>

          <div className="table-layout">
            {selectedPlayers.map((id, index) => {
              const player = playerList.find((p) => p.id === id);
              const pos = positions[id];
              if (!pos) return null;

              return (
                <div
                  key={id}
                  className="grid-card"
                  style={{
                    width: pos.width,
                    height: pos.height,
                    zIndex: 1000 + index,
                  }}
                >
                <PlayerCardDetail player={player} fullInfo />
              </div>

              );
            })}
          </div>
        </>
      )}

      {showRoundModal && (
        <RoundResultModal
          players={selectedPlayers.map((id) =>
            playerList.find((p) => p.id === id)
          )}
          onClose={() => setShowRoundModal(false)}
          onSubmit={handleRoundResult}
        />
      )}
    </div>
  );
}

export default TienLenScreen;
