export default function PlayerCardDetail({ player, selected, onSelect }) {
  return (
    <div
      className={`player-box-detail ${selected ? "selected" : ""}`}
      onClick={onSelect}
    >
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

      {/* Info */}
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "Gray",
            marginBottom: "6px",
          }}
        >
          {player.name}
        </div>

        {/* Hàng chứa thứ hạng và điểm nằm ngang */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            fontSize: "12px",
            fontWeight: "600",
            color: "white",
          }}
        >
          <div>
            <span style={{ fontWeight: "bold" }}>Thứ hạng trước đó: </span>
            {typeof player.lastRank === "number" && !isNaN(player.lastRank)
              ? player.lastRank
              : "-"}
          </div>

          <div>
            <span style={{ fontWeight: "bold" }}>Điểm hiện tại: </span>
            <span
              style={{
                color: "#56c725",
                fontWeight: 500,
                fontSize: "16px",
              }}
            >
              {typeof player.currentScore === "number" &&
              !isNaN(player.currentScore)
                ? player.currentScore
                : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
