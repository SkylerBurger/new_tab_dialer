import "./App.css";
import useApp, { getData } from "./useApp";
import GroupTabs from "../GroupTabs/GroupTabs";
import Time from "../Time/Time";
import DialGroup from "../Dials/DialGroup";

function App() {
  const { config, setConfig, groupIndex, setGroupIndex } = useApp();

  function setBackgroundImg() {
    const bodyEl = document.getElementById("App");
    bodyEl.style.backgroundImage = `url('${config.background}')`;
  }

  function refreshConfig() {
    console.log("refreshing...");
    getData(config.configUrl, setConfig);
    console.log("in theory done refreshing...");
  }

  return (
    <div id="App">
      {config && config.background ? setBackgroundImg() : null}
      {config && config.dialGroups ? (
        <GroupTabs
          groups={config.dialGroups}
          groupIndex={groupIndex}
          refreshConfig={refreshConfig}
          setGroupIndex={setGroupIndex}
        />
      ) : null}
      <Time />
      {config && config.dialGroups ? (
        <DialGroup {...config.dialGroups[groupIndex]} />
      ) : null}
    </div>
  );
}

export default App;
