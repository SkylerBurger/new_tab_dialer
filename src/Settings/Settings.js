import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faRectangleXmark,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./Settings.css";
import { TimeSettings } from "./TimeSettings/TimeSettings";

export function SettingsTab({ showSettings, setShowSettings }) {
  function handleClick() {
    setShowSettings(!showSettings);
  }
  return (
    <ul>
      <li className={showSettings ? "close-attention" : ""}>
        <FontAwesomeIcon
          onClick={handleClick}
          icon={showSettings ? faRectangleXmark : faGear}
        />
      </li>
    </ul>
  );
}

export function Settings({ config, configUrl, getData, updateSetting }) {
  const [urlInputValue, setUrlInputValue] = useState(configUrl);

  const handleConfigRefresh = () => {
    const newUrl = document.getElementById("config-url");
    getData(newUrl.value);
  };

  const handleUrlChange = () => {
    const current = document.getElementById("config-url").value;
    setUrlInputValue(current);
  };

  return (
    <div id="Settings">
      <h1>Settings</h1>
      <h2>Config File URL</h2>
      <input
        type="text"
        label="configURL"
        id="config-url"
        value={urlInputValue}
        onChange={handleUrlChange}
      />
      <FontAwesomeIcon
        onClick={handleConfigRefresh}
        icon={faRefresh}
        className="refresh-icon"
      />
      <TimeSettings
        timeEnabled={config.timeEnabled}
        timeFormat={config.timeFormat}
        updateSetting={updateSetting}
      />
    </div>
  );
}
