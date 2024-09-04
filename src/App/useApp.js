import { useEffect, useState } from "react";

import useGroupStore from "../Stores/useGroupStore";
import useSettingStore from "../Stores/useSettingStore";

function useApp() {
  const [config, setConfig] = useState(null);
  const [dialsVisibility, setDialsVisibility] = useState(false);

  const [showSettings, updateAllSettings] = useSettingStore((state) => [
    state.showSettings,
    state.updateAllSettings,
  ]);
  const [groups, updateAllGroups] = useGroupStore((state) => [
    state.groups,
    state.updateAllGroups,
  ]);

  const updateConfig = (newConfigObj) => {
    localStorage.setItem("dialer-config", JSON.stringify(newConfigObj));
    setConfig(newConfigObj);
  };

  const getData = async (configUrl) => {
    try {
      const response = await fetch(configUrl);
      const parsedConfig = await response.json();
      // TODO: Add validation of the retrieved config here; Joi too much?
      parsedConfig.settings.configUrl = configUrl;
      updateAllSettings(parsedConfig.settings);
      updateAllGroups(parsedConfig.groups);
      // TODO: Remove updateConfig once Zustand is ready
      updateConfig(parsedConfig);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const savedConfig = localStorage.getItem("dialer-config");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    } else {
      const configUrl = window.prompt("URL to JSON config file:");
      getData(configUrl);
    }
  }, []);

  return {
    config,
    getData,
    dialsVisibility,
    setDialsVisibility,
    showSettings,
  };
}

export default useApp;
