import Player from "../models/Player";

import anImg from "../assets/images/an.jpg";
import dyImg from "../assets/images/dy.jpg";
import huyImg from "../assets/images/huy_truong.jpg";
import kienImg from "../assets/images/kien.jpg";
import locImg from "../assets/images/loc.jpg";
import luanImg from "../assets/images/luan.jpg";
import thongImg from "../assets/images/thong.jpg";

export const players = [
  new Player(1, "Quốc An", anImg),
  new Player(2, "Chí Dỹ", dyImg),
  new Player(3, "Huy Trương", huyImg),
  new Player(4, "Sỹ Kiên", kienImg),
  new Player(5, "Thái Lộc", locImg),
  new Player(6, "Hữu Luân", luanImg),
  new Player(7, "Thongheo", thongImg),
];
