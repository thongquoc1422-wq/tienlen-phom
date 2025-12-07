import "../App.css";
import tableImg from '../assets/images/table.jpg'
function HomeScreen({ onSelect }) {
  return (
    <div className="app-phone" style={{ backgroundImage: `url(${tableImg})` }}>
      <div className="select-container">
        <div className="select-box" onClick={() => onSelect("tienlen")}>
          Tiến Lên
        </div>

        <div className="select-box" onClick={() => onSelect("phom")}>
          Phỏm
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
