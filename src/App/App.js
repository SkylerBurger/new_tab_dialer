import Dialer from "../Dialer/Dialer";
import { Settings } from "../Settings/Settings";

import "./App.css";
import useApp from "./useApp";
import Welcome from "../Welcome/Welcome";

function App() {
  const { background, getData, showSettings, showWelcome } = useApp();

  return (
    <div id="App" style={{ backgroundImage: `url("${background}")` }}>
      {showWelcome && <Welcome getData={getData} />}
      {showSettings && !showWelcome && <Settings getData={getData} />}
      {!showSettings && !showWelcome && <Dialer />}
    </div>
  );
}

export default App;
