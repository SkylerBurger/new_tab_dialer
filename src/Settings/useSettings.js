import { useEffect, useState } from "react";
import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";
import useGroupStore from "../Stores/useGroupStore";

function useSettings(getData) {
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
  const environment = process.env.REACT_APP_ENVIRONMENT || "production";

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
    window.chrome.downloads.download({
      url: dataUrl,
      filename: "dialer-config.json",
    });
  };

  return {
    backgroundUrlInputValue,
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
  };
}

export default useSettings;
