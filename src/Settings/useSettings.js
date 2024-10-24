import { useEffect, useState } from "react";

import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";
import useGroupStore from "../Stores/useGroupStore";
import verifyContent from "../Common/Utilities/verifyContent";
import configSchema from "../Validation/config";

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
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const environment = process.env.REACT_APP_ENVIRONMENT || "production";

  useEffect(() => {
    const newBackgroundUrl = document.getElementById("background");
    const applyBackgroundButton = document.getElementById(
      "applyBackgroundButton",
    );
    applyBackgroundButton.disabled = newBackgroundUrl.value === background;
  }, [background, backgroundUrlInputValue]);

  const handleConfigRefresh = async () => {
    const newUrl = document.getElementById("config-url");
    try {
      new URL(newUrl.value);
      await getData(newUrl.value);
    } catch (error) {
      console.log("There was an error");
      setPopUpMessage(
        `The URL provided resulted in the following error: ${error}`,
      );
      setShowPopUp(true);
    }
  };

  const handleConfigUrlChange = () => {
    const current = document.getElementById("config-url").value;
    setConfigUrlInputValue(current);
  };

  const handleBackgroundUrlChange = () => {
    const newUrl = document.getElementById("background").value;
    setBackgroundUrlInputValue(newUrl);
  };

  const handleSetBackground = async () => {
    if (await verifyContent(backgroundUrlInputValue, "image")) {
      updateSetting("background", backgroundUrlInputValue);
      setPopUpMessage("Background updated successfully!");
    } else {
      setPopUpMessage(
        `The URL provided did not lead to a valid image: ${backgroundUrlInputValue}`,
      );
    }
    setShowPopUp(true);
  };

  const clearPopUp = () => {
    setShowPopUp(false);
    setPopUpMessage("");
  };

  const promptDownload = () => {
    const groups = useGroupStore.getState().export();
    const settings = useSettingStore.getState().export();
    const data = {
      groups,
      settings,
    };
    const { error, value } = configSchema.validate(data);
    if (error) {
      setPopUpMessage(`There was an error exporting the data: ${error}`);
      setShowPopUp(true);
      return;
    }
    const encodedData = window.btoa(JSON.stringify(value, null, 2));
    const dataUrl = `data:application/json;base64,${encodedData}`;
    window.chrome.downloads.download({
      url: dataUrl,
      filename: "dialer-config.json",
    });
  };

  const clearCache = async () => {
    const cacheKeys = await caches.keys();
    await Promise.all(
      cacheKeys.map((key) => {
        return caches.delete(key);
      }),
    );
  };

  return {
    backgroundUrlInputValue,
    clearCache,
    clearPopUp,
    configUrlInputValue,
    environment,
    handleConfigRefresh,
    handleConfigUrlChange,
    handleBackgroundUrlChange,
    handleSetBackground,
    popUpMessage,
    promptDownload,
    setShowSettings,
    showPopUp,
    timeEnabled,
    timeFormat,
    updateSetting,
  };
}

export default useSettings;
