import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import NavClose from "../NavClose/NavClose";
import useSettingStore from "../Stores/useSettingStore";

import "./Settings.css";
import { TimeSettings } from "./TimeSettings/TimeSettings";

export function SettingsTab({ setShowConfirm }) {
  const [isPendingChanges, updateShowSettings] = useSettingStore((state) => [
    state.isPendingChanges,
    state.updateShowSettings,
  ]);
  function handleClick() {
    if (isPendingChanges) {
      setShowConfirm({ newIndex: "settings" });
    } else {
      updateShowSettings(true);
    }
  }
  return (
    <ul>
      <li>
        <FontAwesomeIcon onClick={handleClick} icon={faGear} />
      </li>
    </ul>
  );
}

export function Settings({ config, getData }) {
  const [
    configUrl,
    timeEnabled,
    timeFormat,
    updateSetting,
    updateShowSettings,
  ] = useSettingStore((state) => {
    return [
      state.configUrl,
      state.timeEnabled,
      state.timeFormat,
      state.updateSetting,
      state.updateShowSettings,
    ];
  });
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
      <NavClose onClose={() => updateShowSettings(false)} />
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
          timeEnabled={timeEnabled}
          timeFormat={timeFormat}
          updateSetting={updateSetting}
        />
      </div>
    </>
  );
}
