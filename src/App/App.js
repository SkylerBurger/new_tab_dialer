import Dialer from "../Dialer/Dialer";
import { Settings } from "../Settings/Settings";

import "./App.css";
import useApp from "./useApp";
import Welcome from "../Welcome/Welcome";

function App() {
  const { background, getData, showSettings, showWelcome, showDialer } =
    useApp();
  const backgroundStyle = {
    backgroundImage: background
      ? `url("${background}")`
      : "linear-gradient(to bottom, #656565, lightgray, #656565)",
  };

  return (
    <div id="App" style={backgroundStyle}>
      {showWelcome && <Welcome getData={getData} />}
      {showSettings && !showWelcome && <Settings getData={getData} />}
      {showDialer && !showSettings && <Dialer />}
    </div>
  );
}

export default App;
