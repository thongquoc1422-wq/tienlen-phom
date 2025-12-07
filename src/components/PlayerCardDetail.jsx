export default function PlayerCardDetail({ player, selected, onSelect }) {
  return (
    <div
      className={`player-box-detail ${selected ? "selected" : ""}`}
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

      <div style={{ fontSize: "18px", fontWeight: "bold", color: "Gray" }}>
        {player.name}
      </div>

      <div style={{ fontSize: "16px", fontWeight: "600", marginTop: "8px" }}>
        <span style={{ fontWeight: "bold" }}>Thứ hạng trước đó: </span>
        {player.lastRank}
      </div>

      {/* 🔥 Chỉ đổi màu con số */}
      <div style={{ fontSize: "16px", fontWeight: "600", marginTop: "4px" }}>
        <span style={{ fontWeight: "bold" }}>Điểm hiện tại: </span>
        <span
            style={{
                color: "#56c725",
                fontWeight: 500,
                fontSize: "22px",
            }}
            >
            {player.currentScore}
        </span>
      </div>
    </div>
  );
}
