import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import NavClose from "../NavClose/NavClose";

import "./Settings.css";
import { TimeSettings } from "./TimeSettings/TimeSettings";

export function SettingsTab({ setShowSettings }) {
  function handleClick() {
    setShowSettings(true);
  }
  return (
    <ul>
      <li>
        <FontAwesomeIcon onClick={handleClick} icon={faGear} />
      </li>
    </ul>
  );
}

export function Settings({ config, getData, setShowSettings, updateSetting }) {
  const [urlInputValue, setUrlInputValue] = useState(config.configUrl);

  const handleConfigRefresh = () => {
    const newUrl = document.getElementById("config-url");
    getData(newUrl.value);
  };

  const handleUrlChange = () => {
    const current = document.getElementById("config-url").value;
    setUrlInputValue(current);
  };

  return (
    <>
      <NavClose onClose={() => setShowSettings(false)} />
      <div className="Settings">
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
    </>
  );
}
