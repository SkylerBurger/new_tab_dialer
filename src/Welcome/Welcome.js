import { useState } from "react";

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
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const handleCreateGroup = () => {
    createInitialGroup();
    setShowWelcome(false);
    updateGroupIndex(0);
    setShowDialDetails(true);
    setShowDialer(true);
  };

  const handleLoadConfig = async () => {
    const configUrl = document.getElementById("configUrl").value;
    try {
      await getData(configUrl);
      setShowWelcome(false);
    } catch (error) {
      setShowWarning(true);
      setWarningMessage(error.message);
    }
  };

  return {
    handleCreateGroup,
    handleLoadConfig,
    showWarning,
    setShowWarning,
    warningMessage,
  };
}

function Welcome({ getData }) {
  const {
    handleCreateGroup,
    handleLoadConfig,
    showWarning,
    setShowWarning,
    warningMessage,
  } = useWelcome(getData);

  return (
    <div>
      {showWarning ? (
        <PopUpModal onBlur={() => setShowWarning(false)}>
          <p>The config URL provided resulted in the following error:</p>
          <p>{warningMessage}</p>
          <button className="green" onClick={() => setShowWarning(false)}>
            Close
          </button>
        </PopUpModal>
      ) : (
        <PopUpModal>
          <div className="Welcome">
            <h2>Welcome to Mynt Dialer</h2>
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
      )}
    </div>
  );
}

export default Welcome;
