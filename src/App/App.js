import Dialer from "../Dialer/Dialer";
import { Settings } from "../Settings/Settings";

import "./App.css";
import useApp from "./useApp";
import NewGroupForm from "../Group/NewGroupForm/NewGroupForm";

function App() {
  const { background, getData, showSettings, showNewGroupForm } = useApp();

  return (
    <div id="App" style={{ backgroundImage: `url("${background}")` }}>
      {showSettings ? <Settings getData={getData} /> : <Dialer />}
      {showNewGroupForm && <NewGroupForm />}
    </div>
  );
}

export default App;
