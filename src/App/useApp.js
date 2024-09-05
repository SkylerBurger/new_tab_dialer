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
  const [showSettings] = useRenderStore((state) => [state.showSettings]);

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

  useEffect(() => {
    const missingFromStorage = !groupsfromStorage || !settingsFromStorage;
    if (missingFromStorage) {
      const configUrl = window.prompt("URL to JSON config file:");
      getData(configUrl);
    }
  }, []);

  return {
    background,
    getData,
    showSettings,
  };
}

export default useApp;
