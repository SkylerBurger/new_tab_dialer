import './App.css';
import useApp from './useApp';
import GroupTabs from '../GroupTabs/GroupTabs';
import Time from '../Time/Time';
import DialGroup from '../Dials/DialGroup';

function App() {
  const { background, dialGroups, groupIndex, setGroupIndex } = useApp();

  function setBackgroundImg() {
    const bodyEl = document.getElementById("App");
    bodyEl.style.backgroundImage = `url('${ background }')`;
  }

  return (
    <div id="App">
      { background ? setBackgroundImg() : null }
      { dialGroups ? <GroupTabs 
                        groups={ dialGroups } 
                        groupIndex={ groupIndex } 
                        setGroupIndex={ setGroupIndex } 
                      /> 
        : null }
      <Time />
      { dialGroups ? <DialGroup { ...dialGroups[groupIndex] }/> : null }
    </div>
  );
}

export default App;
