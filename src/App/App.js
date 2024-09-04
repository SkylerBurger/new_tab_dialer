import Dialer from "../Dialer/Dialer";
import { Settings } from "../Settings/Settings";

import "./App.css";
import useApp from "./useApp";

function App() {
  const { config, getData, dialsVisibility, setDialsVisibility, showSettings } =
    useApp();

  function setBackgroundImg() {
    const bodyEl = document.getElementById("App");
    bodyEl.style.backgroundImage = `url('${config.settings.background}')`;
  }

  return (
    <div id="App">
      {config && config.settings.background ? setBackgroundImg() : null}
      {showSettings ? (
        <Settings config={config} getData={getData} />
      ) : (
        <Dialer
          dialsVisibility={dialsVisibility}
          setDialsVisibility={setDialsVisibility}
        />
      )}
    </div>
  );
}

export default App;
