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
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "8px",
        }}
      />

      <div style={{ fontSize: "14px", fontWeight: "bold", color: "Gray" }}>
        {player.name}
      </div>

      <div style={{ fontSize: "12px", fontWeight: "600", marginTop: "8px" }}>
      <span style={{ fontWeight: "bold" }}>Thứ hạng trước đó: </span>
        {typeof player.lastRank === "number" && !isNaN(player.lastRank)
          ? player.lastRank
          : "-"}
      </div>

      {/* 🔥 Chỉ đổi màu con số */}
      <div style={{ fontSize: "12px", fontWeight: "600", marginTop: "4px" }}>
        <span style={{ fontWeight: "bold" }}>Điểm hiện tại: </span>
        <span
          style={{
            color: "#56c725",
            fontWeight: 500,
            fontSize: "22px",
          }}
        >
          {typeof player.currentScore === "number" && !isNaN(player.currentScore)
            ? player.currentScore
            : 0}
        </span>
      </div>
    </div>
  );
}
