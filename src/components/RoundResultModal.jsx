import React, { useState } from "react";
import "../App.css";

export default function RoundResultModal({ players, onClose, onSubmit }) {
  const [mode, setMode] = useState("1-2");

  // Lưu kết quả từng người
  const [results, setResults] = useState(
    players.reduce((acc, p) => {
      acc[p.id] = {
        rank: null,
        eatHeoDo: 0,
        loseHeoDo: 0,
        eatHeoDen: 0,
        loseHeoDen: 0,
      };
      return acc;
    }, {})
  );

  // Tính các rank đã được chọn
  const takenRanks = Object.values(results)
    .map((r) => r.rank)
    .filter((r) => r !== null);

  const updateField = (id, field, value) => {
    setResults((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const chooseRank = (playerId, rank) => {
    const currentRank = results[playerId].rank;

    // Nếu đang chọn rank này → bấm lại để hủy chọn
    if (currentRank === rank) {
      updateField(playerId, "rank", null);
      return;
    }

    // Nếu rank đã có người khác chọn → không cho chọn
    if (takenRanks.includes(rank)) return;

    // Chọn rank
    updateField(playerId, "rank", rank);
  };

  const submit = () => {
    onSubmit({ mode, results });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2 className="modal-title">Kết quả ván đấu</h2>

        {/* Mode */}
        <div className="mode-select">
          <label className="radio-option">
            <input
              type="radio"
              checked={mode === "1-2"}
              onChange={() => setMode("1-2")}
            />
            <span>Điểm 1 – 2</span>
          </label>

          <label className="radio-option">
            <input
              type="radio"
              checked={mode === "2-4"}
              onChange={() => setMode("2-4")}
            />
            <span>Điểm 2 – 4</span>
          </label>
        </div>

        {/* Danh sách người chơi */}
        <div className="player-result-list">
          {players.map((p) => (
            <div key={p.id} className="player-result-row">

              <div className="player-name">{p.name}</div>

              {/* Rank selection */}
              <div className="rank-box">
                Thứ hạng:
                {[1, 2, 3, 4].map((r) => {
                  const isMine = results[p.id].rank === r;
                  const isTaken = takenRanks.includes(r) && !isMine;

                  return (
                    <div
                      key={r}
                      className={`rank-item 
                        ${isMine ? "rank-selected" : ""} 
                        ${isTaken ? "rank-disabled" : ""}
                      `}
                      onClick={() => {
                        if (!isTaken || isMine) chooseRank(p.id, r);
                      }}
                    >
                      {r}
                    </div>
                  );
                })}
              </div>

              {/* Heo đỏ ăn */}
              <div className="heo-box">
                <label>Heo đỏ ăn</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={results[p.id].eatHeoDo}
                  onChange={(e) =>
                    updateField(p.id, "eatHeoDo", Number(e.target.value))
                  }
                  className="heo-input"
                />
              </div>

              {/* Heo đỏ bị ăn */}
              <div className="heo-box">
                <label>Heo đỏ bị ăn</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={results[p.id].loseHeoDo}
                  onChange={(e) =>
                    updateField(p.id, "loseHeoDo", Number(e.target.value))
                  }
                  className="heo-input"
                />
              </div>

              {/* Heo đen ăn */}
              <div className="heo-box">
                <label>Heo đen ăn</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={results[p.id].eatHeoDen}
                  onChange={(e) =>
                    updateField(p.id, "eatHeoDen", Number(e.target.value))
                  }
                  className="heo-input"
                />
              </div>

              {/* Heo đen bị ăn */}
              <div className="heo-box">
                <label>Heo đen bị ăn</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={results[p.id].loseHeoDen}
                  onChange={(e) =>
                    updateField(p.id, "loseHeoDen", Number(e.target.value))
                  }
                  className="heo-input"
                />
              </div>

            </div>
          ))}
        </div>

        <div className="btn-row">
          <button onClick={onClose} className="cancel-btn">Hủy</button>
          <button onClick={submit} className="confirm-btn">Xác nhận</button>
        </div>

      </div>
    </div>
  );
}
