import "./Welcome.css";
import PopUpModal from "../Common/PopUpModal/PopUpModal";
import useGroupStore from "../Stores/useGroupStore";
import useRenderStore from "../Stores/useRenderStore";
import useSettingStore from "../Stores/useSettingStore";

function useWelcome(getData) {
  const [createInitialGroup] = useGroupStore((state) => [
    state.createInitialGroup,
  ]);
  const [setShowWelcome, setShowDialDetails, setShowDialer] = useRenderStore(
    (state) => [
      state.setShowWelcome,
      state.setShowDialDetails,
      state.setShowDialer,
    ],
  );
  const [updateGroupIndex] = useSettingStore((state) => [
    state.updateGroupIndex,
  ]);

  const handleCreateGroup = () => {
    createInitialGroup();
    setShowWelcome(false);
    updateGroupIndex(0);
    setShowDialDetails(true);
    setShowDialer(true);
  };

  const handleLoadConfig = () => {
    const configUrl = document.getElementById("configUrl").value;
    getData(configUrl);
    setShowWelcome(false);
  };

  return {
    handleCreateGroup,
    handleLoadConfig,
  };
}

function Welcome({ getData }) {
  const { handleCreateGroup, handleLoadConfig } = useWelcome(getData);

  return (
    <PopUpModal>
      <div className="Welcome">
        <h2>Welcome to New Tab Dialer</h2>
        <p>You can get started by creating your first group, </p>
        <button className="green" onClick={handleCreateGroup}>
          Create a Group
        </button>
        <p>Or supply a link to a config file:</p>
        <input
          type="text"
          id="configUrl"
          placeholder="https://example.com/config.json"
        />
        <button className="green" onClick={handleLoadConfig}>
          Load Config
        </button>
      </div>
    </PopUpModal>
  );
}

export default Welcome;
