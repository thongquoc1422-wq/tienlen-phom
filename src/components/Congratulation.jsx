import React from "react";
import "../App.css";

export default function Congratulation({ player, onClose }) {
  if (!player) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box congratulation-box">

        <h2 className="modal-title" style={{ textAlign: "center" }}>
          ĐỊT MẸ HAY VÃI LOZ
        </h2>

        <div className="congrats-content">

          {/* Trophy + Clap */}
          <div className="trophy">🏆👏</div>

          {/* Avatar */}
          <img
            src={player.avatar}
            alt={player.name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "16px",
            }}
          />

          {/* Name */}
          <div className="winner-name">{player.name}</div>

          {/* Score */}
          <div className="winner-info">
            {player.currentScore !== undefined && (
              <p>Điểm: {player.currentScore}</p>
            )}
          </div>

          {/* 👏 Clap Icon */}
          <div style={{ fontSize: "32px", marginTop: "10px" }}>
            👏👏👏
          </div>

        </div>

        <div className="btn-row">
          <button onClick={onClose} className="confirm-btn">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
