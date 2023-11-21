import { useEffect, useState } from 'react';

function useApp() {
    const [ config, setConfig ] = useState(null);
    const [ groupIndex, setGroupIndex ] = useState(0);
    
    useEffect(() => {
        const savedConfig = localStorage.getItem('dialer-config');
        if (savedConfig) {
            setConfig(JSON.parse(savedConfig));
        } else {
            const configUrl = window.prompt('URL to JSON config file:');
            getData(configUrl, setConfig);
        }
    }, [])

    return { config, setConfig, groupIndex, setGroupIndex }
};

export async function getData (configUrl, setConfig) {
    try {
        const response = await fetch(configUrl);
        const parsedConfig = await response.json();
        parsedConfig.configUrl = configUrl;
        localStorage.setItem('dialer-config', JSON.stringify(parsedConfig));
        setConfig(parsedConfig);
    } catch (error) {
        console.error(error);
    }
};

export default useApp;
