import { useEffect } from "react";

import useGroupStore from "../Stores/useGroupStore";
import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";

function useApp() {
  const [background, updateAllSettings, settingsFromStorage] = useSettingStore(
    (state) => [
      state.background,
      state.updateAllSettings,
      state.loadedFromStorage,
    ],
  );
  const [groupsfromStorage, updateAllGroups] = useGroupStore((state) => [
    state.loadedFromStorage,
    state.updateAllGroups,
  ]);
  const [showSettings, showNewGroupForm, showWelcome, setShowWelcome] =
    useRenderStore((state) => [
      state.showSettings,
      state.showNewGroupForm,
      state.showWelcome,
      state.setShowWelcome,
    ]);
  const environment = process.env.REACT_APP_ENVIRONMENT || "production";

  const getData = async (configUrl) => {
    try {
      const response = await fetch(configUrl);
      const parsedConfig = await response.json();
      // TODO: Add validation of the retrieved config here; Joi too much?
      parsedConfig.settings.configUrl = configUrl;
      updateAllSettings(parsedConfig.settings);
      updateAllGroups(parsedConfig.groups);
    } catch (error) {
      console.error(error);
    }
  };

  // Show the welcome screen if no settings or groups are in storage
  useEffect(() => {
    if (environment !== "demo") {
      const missingFromStorage = !groupsfromStorage || !settingsFromStorage;
      setShowWelcome(missingFromStorage);
    } else {
      import("../Demo/demo-config.json").then((data) => {
        updateAllSettings(data.settings);
        updateAllGroups(data.groups);
      });
    }
  }, [
    settingsFromStorage,
    groupsfromStorage,
    environment,
    setShowWelcome,
    updateAllSettings,
    updateAllGroups,
  ]);

  // Set the background image
  useEffect(() => {
    const appElement = document.getElementById("App");
    if (appElement && background) {
      appElement.style.backgroundImage = `url("${background}")`;
    }
  }, [background]);

  return {
    background,
    getData,
    showSettings,
    showNewGroupForm,
    showWelcome,
  };
}

export default useApp;
