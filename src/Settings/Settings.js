import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowDown,
  faGear,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import NavClose from "../Common/NavClose/NavClose";
import useSettingStore from "../Stores/useSettingStore";
import useGroupStore from "../Stores/useGroupStore";
import useRenderStore from "../Stores/useRenderStore";

import "./Settings.css";
import { TimeSettings } from "./TimeSettings/TimeSettings";

export function SettingsTab() {
  const [setShowSettings] = useRenderStore((state) => {
    return [state.setShowSettings];
  });

  function handleClick() {
    setShowSettings(true);
  }

  return (
    <ul style={{ marginBottom: "auto" }}>
      <li title="Open Settings">
        <FontAwesomeIcon onClick={handleClick} icon={faGear} />
      </li>
    </ul>
  );
}

export function Settings({ getData }) {
  const [background, configUrl, timeEnabled, timeFormat, updateSetting] =
    useSettingStore((state) => {
      return [
        state.background,
        state.configUrl,
        state.timeEnabled,
        state.timeFormat,
        state.updateSetting,
      ];
    });
  const [setShowSettings] = useRenderStore((state) => [state.setShowSettings]);
  const [configUrlInputValue, setConfigUrlInputValue] = useState(configUrl);
  const [backgroundUrlInputValue, setBackgroundUrlInputValue] =
    useState(background);

  useEffect(() => {
    const newBackgroundUrl = document.getElementById("background");
    const applyBackgroundButton = document.getElementById(
      "applyBackgroundButton",
    );
    applyBackgroundButton.disabled = newBackgroundUrl.value === background;
  }, [background, backgroundUrlInputValue]);

  const handleConfigRefresh = () => {
    const newUrl = document.getElementById("config-url");
    getData(newUrl.value);
  };

  const handleConfigUrlChange = () => {
    const current = document.getElementById("config-url").value;
    setConfigUrlInputValue(current);
  };

  const handleBackgroundUrlChange = () => {
    const newUrl = document.getElementById("background").value;
    setBackgroundUrlInputValue(newUrl);
  };

  const handleSetBakcground = () => {
    updateSetting("background", backgroundUrlInputValue);
  };

  const promptDownload = () => {
    const groups = useGroupStore.getState().export();
    const settings = useSettingStore.getState().export();
    const data = {
      groups,
      settings,
    };
    const encodedData = window.btoa(JSON.stringify(data, null, 2));
    const dataUrl = `data:application/json;base64,${encodedData}`;
    window.chrome.runtime.sendMessage({
      event: "promptDownload",
      value: dataUrl,
    });
    console.log(dataUrl);
  };

  return (
    <>
      <NavClose onClose={() => setShowSettings(false)} />
      <div className="Settings">
        <h1>Settings</h1>
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
        />
        <FontAwesomeIcon
          icon={faFileArrowDown}
          className="download-icon"
          onClick={promptDownload}
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
