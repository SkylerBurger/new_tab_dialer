import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import NavClose from "../Common/NavClose/NavClose";
import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";

import "./Settings.css";
import { TimeSettings } from "./TimeSettings/TimeSettings";

export function SettingsTab() {
  const [isPendingChanges, setShowSettings] = useRenderStore((state) => {
    return [state.isPendingChanges, state.setShowSettings];
  });
  const [setNextIndex, setShowConfirmUnsavedNav] = useRenderStore((state) => [
    state.setNextIndex,
    state.setShowConfirmUnsavedNav,
  ]);

  function handleClick() {
    if (isPendingChanges) {
      setNextIndex("settings");
      setShowConfirmUnsavedNav(true);
    } else {
      setShowSettings(true);
    }
  }
  return (
    <ul style={{ marginBottom: "auto" }}>
      <li>
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
        <TimeSettings
          timeEnabled={timeEnabled}
          timeFormat={timeFormat}
          updateSetting={updateSetting}
        />
      </div>
    </>
  );
}
