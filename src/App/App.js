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
    updateGroupDials,
  } = useApp();

  function setBackgroundImg() {
    const bodyEl = document.getElementById("App");
    bodyEl.style.backgroundImage = `url('${config.settings.background}')`;
  }

  const renderDialer = () => {
    return (
      config && (
        <Dialer
          groups={config.groups}
          dialsVisibility={dialsVisibility}
          currentGroupIndex={config.settings.currentGroupIndex}
          setDialsVisibility={setDialsVisibility}
          setShowSettings={setShowSettings}
          timeEnabled={config.settings.timeEnabled}
          timeFormat={config.settings.timeFormat}
          updateGroupIndex={updateGroupIndex}
          updateGroupDials={updateGroupDials}
        />
      )
    );
  };

  return (
    <div id="App">
      {config && config.settings.background ? setBackgroundImg() : null}
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
