import "./App.css";
import Dialer from "../Dialer/Dialer";
import useApp from "./useApp";
import GroupTabs from "../GroupTabs/GroupTabs";
import { Settings } from "../Settings/Settings";

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

  function mainContent() {
    return ( config &&
      <Dialer
        dialGroup={config.dialGroups[config.groupIndex]}
        dialsVisibility={dialsVisibility}
        setDialsVisibility={setDialsVisibility} 
        timeEnabled={config.timeEnabled}
        timeFormat={config.timeFormat}
      />
    );
  }

  return (
    <div id="App">
      {config && config.background ? setBackgroundImg() : null}
      {config && config.dialGroups ? (
        <GroupTabs
          groups={config.dialGroups}
          groupIndex={config.groupIndex}
          updateGroupIndex={updateGroupIndex}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
      ) : null}
      {showSettings ? (
        <Settings
          config={config}
          configUrl={config.configUrl}
          getData={getData}
          updateSetting={updateSetting}
        />
      ) : (
        mainContent()
      )}
    </div>
  );
}

export default App;
