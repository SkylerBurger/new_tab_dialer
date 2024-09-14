import Dialer from "../Dialer/Dialer";
import { Settings } from "../Settings/Settings";

import "./App.css";
import useApp from "./useApp";
import NewGroupForm from "../Group/NewGroupForm/NewGroupForm";
import Welcome from "../Welcome/Welcome";

function App() {
  const { background, getData, showSettings, showNewGroupForm, showWelcome } =
    useApp();

  return (
    <div id="App" style={{ backgroundImage: `url("${background}")` }}>
      {showWelcome && <Welcome getData={getData} />}
      {showSettings && !showWelcome && <Settings getData={getData} />}
      {!showSettings && !showWelcome && <Dialer />}
      {showNewGroupForm && <NewGroupForm />}
    </div>
  );
}

export default App;
