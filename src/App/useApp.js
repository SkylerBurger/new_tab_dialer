import { useEffect, useState } from "react";

function useApp() {
  const [config, setConfig] = useState(null);

  const updateConfig = (newConfigObj) => {
    localStorage.setItem("dialer-config", JSON.stringify(newConfigObj));
    setConfig(newConfigObj);
  }

  const updateGroupIndex = (newIndex) => {
    const newConfig = {...config, "groupIndex": newIndex}
    updateConfig(newConfig);
  }

  const getData = async (configUrl) => {
    try {
      const response = await fetch(configUrl);
      const parsedConfig = await response.json();
      parsedConfig.configUrl = configUrl;
      updateConfig(parsedConfig);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const savedConfig = localStorage.getItem("dialer-config");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    } else {
      const configUrl = window.prompt("URL to JSON config file:");
      getData(configUrl, setConfig);
    }
  }, []);

  return { config, updateGroupIndex };
}

export default useApp;
