import "./App.css";
import useApp from "./useApp";
import GroupTabs from "../GroupTabs/GroupTabs";
import Time from "../Time/Time";
import DialGroup from "../Dials/DialGroup";

function App() {
  const { config, updateGroupIndex, dialsVisibility, setDialsVisibility } =
    useApp();

  function setBackgroundImg() {
    const bodyEl = document.getElementById("App");
    bodyEl.style.backgroundImage = `url('${config.background}')`;
  }

  return (
    <div id="App">
      {config && config.background ? setBackgroundImg() : null}
      {config && config.dialGroups ? (
        <GroupTabs
          groups={config.dialGroups}
          groupIndex={config.groupIndex}
          updateGroupIndex={updateGroupIndex}
        />
      ) : null}
      <Time />
      {config && config.dialGroups ? (
        <DialGroup
          {...config.dialGroups[config.groupIndex]}
          dialVisibility={dialsVisibility}
          setDialVisibility={setDialsVisibility}
        />
      ) : null}
    </div>
  );
}

export default App;
