import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import TienLenScreen from "./screens/TienLenScreen";
import PhomScreen from "./screens/PhomScreen";

function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "tienlen") return <TienLenScreen goHome={() => setScreen("home")} />;
  // if (screen === "phom") return <PhomScreen goHome={() => setScreen("home")} />;

  return <HomeScreen onSelect={(mode) => setScreen(mode)} />;
}

export default App;
