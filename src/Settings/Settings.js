import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faGear,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";

import NavClose from "../Common/NavClose/NavClose";
import useRenderStore from "../Stores/useRenderStore";

import "./Settings.css";
import useSettings from "./useSettings";
import TimeSettings from "./TimeSettings/TimeSettings";

export function SettingsTab() {
  const [setShowSettings] = useRenderStore((state) => {
    return [state.setShowSettings];
  });

  function handleClick() {
    setShowSettings(true);
  }

  return (
    <ul style={{ marginBottom: "auto" }}>
      <li title="Open Settings" onClick={handleClick}>
        <FontAwesomeIcon icon={faGear} />
      </li>
    </ul>
  );
}

export function Settings({ getData }) {
  const {
    backgroundUrlInputValue,
    clearCache,
    configUrlInputValue,
    environment,
    handleConfigRefresh,
    handleConfigUrlChange,
    handleBackgroundUrlChange,
    handleSetBakcground,
    promptDownload,
    setShowSettings,
    timeEnabled,
    timeFormat,
    updateSetting,
  } = useSettings(getData);

  return (
    <>
      <NavClose onClose={() => setShowSettings(false)} />
      <div className="Settings">
        <h1>Settings</h1>
        <div>
          <h2>Config File URL</h2>
          <input
            type="text"
            label="configURL"
            id="config-url"
            value={configUrlInputValue}
            onChange={handleConfigUrlChange}
          />
          <FontAwesomeIcon
            onClick={handleConfigRefresh}
            icon={faRefresh}
            className="refresh-icon"
            title="Downstream Config Sync"
          />
          <FontAwesomeIcon
            icon={faFileArrowDown}
            className="download-icon"
            onClick={environment === "demo" ? null : promptDownload}
            style={environment === "demo" ? { color: "gray" } : {}}
            title={
              environment === "demo"
                ? "Download Disabled in Demo, must be installed as a Chrome Extension"
                : "Download Config File"
            }
          />
        </div>
        <div>
          <h2>Background</h2>
          <input
            type="text"
            label="background"
            id="background"
            value={backgroundUrlInputValue}
            onChange={handleBackgroundUrlChange}
          />
          <button id="applyBackgroundButton" onClick={handleSetBakcground}>
            Apply Background
          </button>
        </div>
        <div>
          <h2>Caching</h2>
          <button id="clearCacheButton" onClick={clearCache}>
            Clear Image Cache
          </button>
        </div>
        <TimeSettings
          timeEnabled={timeEnabled}
          timeFormat={timeFormat}
          updateSetting={updateSetting}
        />
      </div>
    </>
  );
}
