import './App.css';
import useApp from './useApp';
import Time from '../Time/Time';
import Dials from '../Dials/Dials';

function App() {
  const { background, dials } = useApp();

  function setBackgroundImg() {
    const bodyEl = document.getElementById("App");
    bodyEl.style.backgroundImage = `url('${ background }')`;
  }

  return (
    <div id="App">
      { background ? setBackgroundImg() : null }
      <Time />
      { dials ? <Dials dials={ dials }/> : null }
    </div>
  );
}

export default App;
