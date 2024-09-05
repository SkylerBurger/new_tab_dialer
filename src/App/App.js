import Dialer from "../Dialer/Dialer";
import { Settings } from "../Settings/Settings";

import "./App.css";
import useApp from "./useApp";

function App() {
  const { background, getData, showSettings } = useApp();

  return (
    <div id="App" style={{ backgroundImage: `url("${background}")` }}>
      {showSettings ? <Settings getData={getData} /> : <Dialer />}
    </div>
  );
}

export default App;
