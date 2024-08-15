import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./Settings.css";

export function SettingsIcon({ showSettings, setShowSettings }) {
  function handleClick() {
    setShowSettings(!showSettings);
  }
  return <FontAwesomeIcon onClick={handleClick} icon={faGear} />;
}

export function Settings({ configUrl, getData }) {
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
    <>
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
    </>
  );
}
