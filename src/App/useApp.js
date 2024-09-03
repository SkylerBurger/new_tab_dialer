import { useEffect, useState } from "react";

import useGroupStore from "../Stores/useGroupStore";
import useSettingsStore from "../Stores/useSettingsStore";

function useApp() {
  const [config, setConfig] = useState(null);
  const [dialsVisibility, setDialsVisibility] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [groups, updateGroups] = useGroupStore((state) => [
    state.groups,
    state.updateGroups,
  ]);
  const [settings, updateSettings] = useSettingsStore((state) => [
    state.settings,
    state.updateSettings,
  ]);

  const updateSetting = (settingName, settingValue) => {
    const newConfig = {
      ...config,
      settings: { ...config.settings, [settingName]: settingValue },
    };
    updateConfig(newConfig);
  };

  const updateConfig = (newConfigObj) => {
    localStorage.setItem("dialer-config", JSON.stringify(newConfigObj));
    setConfig(newConfigObj);
  };

  const updateGroupDials = (groupName, newDials) => {
    const newConfig = {
      ...config,
      groups: config.groups.map((group) =>
        group.name === groupName ? { ...group, dials: newDials } : group,
      ),
    };
    updateConfig(newConfig);
  };

  const updateGroupIndex = (newIndex) => {
    if (newIndex !== config.settings.currentGroupIndex) {
      const newConfig = {
        ...config,
        settings: { ...config.settings, currentGroupIndex: newIndex },
      };
      setDialsVisibility(false);
      updateConfig(newConfig);
    }
  };

  const getData = async (configUrl) => {
    try {
      const response = await fetch(configUrl);
      const parsedConfig = await response.json();
      // TODO: Add validation of the retrieved config here; Joi too much?
      parsedConfig.settings.configUrl = configUrl;
      updateSettings(parsedConfig.settings);
      updateGroups(parsedConfig.groups);
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
    updateGroupIndex,
    dialsVisibility,
    setDialsVisibility,
    showSettings,
    setShowSettings,
    updateSetting,
    updateGroupDials,
  };
}

export default useApp;
