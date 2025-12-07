import React from "react";

export default function PlayerCard({ player, selected, onSelect }) {
  return (
    <div
      className={`player-box ${selected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <img
        src={player.avatar}
        alt={player.name}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "8px",
        }}
      />

      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
        {player.name}
      </div>
    </div>
  );
}
