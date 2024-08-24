import { useEffect, useState } from "react";

function useApp() {
  const [config, setConfig] = useState(null);
  const [dialsVisibility, setDialsVisibility] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const updateSetting = (settingName, settingValue) => {
    const newConfig = { ...config, [settingName]: settingValue };
    updateConfig(newConfig);
  };

  const updateConfig = (newConfigObj) => {
    localStorage.setItem("dialer-config", JSON.stringify(newConfigObj));
    setConfig(newConfigObj);
  };

  const updateGroupDials = (groupName, newDials) => {
    const newConfig = {
      ...config,
      dialGroups: config.dialGroups.map((group) =>
        group.groupName === groupName
          ? { ...group, groupDials: newDials }
          : group,
      ),
    };
    updateConfig(newConfig);
  };

  const updateGroupIndex = (newIndex) => {
    if (newIndex !== config.groupIndex) {
      const newConfig = { ...config, groupIndex: newIndex };
      setDialsVisibility(false);
      updateConfig(newConfig);
    }
  };

  const getData = async (configUrl) => {
    try {
      const response = await fetch(configUrl);
      const parsedConfig = await response.json();
      // TODO: Add validation of the retrieved config here; Joi too much?
      parsedConfig.configUrl = configUrl;
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
