import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import NavClose from "../NavClose/NavClose";
import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";

import "./Settings.css";
import { TimeSettings } from "./TimeSettings/TimeSettings";

export function SettingsTab({ setShowConfirm }) {
  const [isPendingChanges, setShowSettings] = useRenderStore((state) => {
    return [state.isPendingChanges, state.setShowSettings];
  });

  function handleClick() {
    if (isPendingChanges) {
      setShowConfirm({ newIndex: "settings" });
    } else {
      setShowSettings(true);
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

export function Settings({ getData }) {
  const [configUrl, timeEnabled, timeFormat, updateSetting] = useSettingStore(
    (state) => {
      return [
        state.configUrl,
        state.timeEnabled,
        state.timeFormat,
        state.updateSetting,
      ];
    },
  );
  const [setShowSettings] = useRenderStore((state) => [state.setShowSettings]);
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
          timeEnabled={timeEnabled}
          timeFormat={timeFormat}
          updateSetting={updateSetting}
        />
      </div>
    </>
  );
}
