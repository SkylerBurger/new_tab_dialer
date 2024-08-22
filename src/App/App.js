import Dialer from "../Dialer/Dialer";
import { Settings } from "../Settings/Settings";

import "./App.css";
import useApp from "./useApp";

function App() {
  const {
    config,
    getData,
    updateGroupIndex,
    dialsVisibility,
    setDialsVisibility,
    showSettings,
    setShowSettings,
    updateSetting,
  } = useApp();

  function setBackgroundImg() {
    const bodyEl = document.getElementById("App");
    bodyEl.style.backgroundImage = `url('${config.background}')`;
  }

  const renderDialer = () => {
    return (
      config && (
        <Dialer
          dialGroups={config.dialGroups}
          dialsVisibility={dialsVisibility}
          groupIndex={config.groupIndex}
          setDialsVisibility={setDialsVisibility}
          setShowSettings={setShowSettings}
          timeEnabled={config.timeEnabled}
          timeFormat={config.timeFormat}
          updateGroupIndex={updateGroupIndex}
        />
      )
    );
  };

  return (
    <div id="App">
      {config && config.background ? setBackgroundImg() : null}
      {showSettings ? (
        <Settings
          config={config}
          getData={getData}
          setShowSettings={setShowSettings}
          updateSetting={updateSetting}
        />
      ) : (
        renderDialer()
      )}
    </div>
  );
}

export default App;
