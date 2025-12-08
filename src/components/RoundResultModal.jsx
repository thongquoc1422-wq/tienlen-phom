import React, { useState } from "react";
import "../App.css";

export default function RoundResultModal({ players, onClose, onSubmit }) {
  const [mode, setMode] = useState("1-2");

  const [results, setResults] = useState(
    players.reduce((acc, p) => {
      acc[p.id] = {
        rank: null,
        heoDo: 0,
        heoDen: 0,
      };
      return acc;
    }, {})
  );

  function NumberStepper({ value, min = 0, max = 10, onChange }) {
    const decrease = () => {
      if (value > min) onChange(value - 1);
    };

    const increase = () => {
      if (value < max) onChange(value + 1);
    };

    return (
      <div className="number-stepper">
        <button type="button" onClick={decrease}>
          –
        </button>
        <span>{value}</span>
        <button type="button" onClick={increase}>
          +
        </button>
      </div>
    );
  }

  const takenRanks = Object.values(results)
    .map((r) => r.rank)
    .filter((r) => r !== null);

  const updateField = (id, field, value) => {
    // ép kiểu number cho chắc chắn
    const numericValue = typeof value === "number" ? value : Number(value);
    setResults((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: numericValue,
      },
    }));
  };

  const chooseRank = (playerId, rank) => {
    const currentRank = results[playerId].rank;
    if (currentRank === rank) {
      updateField(playerId, "rank", null);
      return;
    }
    if (takenRanks.includes(rank)) return;
    updateField(playerId, "rank", rank);
  };


const submit = () => {
  // Tính tổng heo đỏ và heo đen
  let totalHeoDo = 0;
  let totalHeoDen = 0;

  for (const playerId in results) {
    const r = results[playerId];
    totalHeoDo += Number(r.heoDo) || 0;
    totalHeoDen += Number(r.heoDen) || 0;
  }

  // Kiểm tra cân bằng heo đỏ và heo đen
  if (totalHeoDo !== 0) {
    alert("Ông tính heo kiểu đéo gì đấy???");
    return; // dừng submit
  }

  if (totalHeoDen !== 0) {
    alert("Ông tính heo kiểu đéo gì đấy???");
    return; // dừng submit
  }
  
  const allRanked = Object.values(results).every(r => r.rank !== null);

  if (!allRanked) {
    alert("Ông nhập có thiếu thằng nào không???");
    return;
  }




  // Nếu đúng thì gửi dữ liệu
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
                {[1, 2, 3, 4].map((r) => {
                  const isMine = results[p.id].rank === r;
                  const isTaken = takenRanks.includes(r) && !isMine;
                  return (
                    <div
                      key={r}
                      className={`rank-item 
                        ${isMine ? "rank-selected" : ""} 
                        ${isTaken ? "rank-disabled" : ""}`}
                      onClick={() => {
                        if (!isTaken || isMine) chooseRank(p.id, r);
                      }}
                    >
                      {r}
                    </div>
                  );
                })}
              </div>

              {/* Heo đỏ */}
              <div className="heo-box">
                <label style={{color : "red", fontWeight: "bold"}}>Heo đỏ</label>
                <NumberStepper
                  value={results[p.id].heoDo}
                  min={-10}
                  max={10}
                  onChange={(val) => updateField(p.id, "heoDo", val)}
                />
              </div>
              {/* Heo đen */}
              <div className="heo-box">
                <label style={{color : "black", fontWeight: "bold"}}>Heo đen</label>
                <NumberStepper
                  value={results[p.id].heoDen}
                  min={-10}
                  max={10}
                  onChange={(val) => updateField(p.id, "heoDen", val)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="btn-row">
          <button onClick={onClose} className="cancel-btn">
            Hủy
          </button>
          <button onClick={submit} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
