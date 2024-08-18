import "./App.css";
import useApp from "./useApp";
import GroupTabs from "../GroupTabs/GroupTabs";
import { Settings } from "../Settings/Settings";
import Time from "../Time/Time";
import DialGroup from "../Dials/DialGroup";

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
    if (!config) return;

    return (
      <>
        {config.timeEnabled ? <Time /> : null}
        {config.dialGroups ? (
          <DialGroup
            {...config.dialGroups[config.groupIndex]}
            dialVisibility={dialsVisibility}
            setDialVisibility={setDialsVisibility}
          />
        ) : null}
      </>
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
