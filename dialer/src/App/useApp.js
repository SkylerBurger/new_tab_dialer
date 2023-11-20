import { useEffect, useState } from 'react';

function useApp() {
    const [ config, setConfig ] = useState(null);
    const [ groupIndex, setGroupIndex ] = useState(0);
    
    useEffect(() => {
        async function getData () {
            const configUrl = window.prompt('URL to JSON config file:');
            
            try {
                const response = await fetch(configUrl);
                const parsedConfig = await response.json();
                localStorage.setItem('dialer-config', JSON.stringify(parsedConfig));
                setConfig(parsedConfig);
            } catch (error) {
                console.error(error);
            }
        };

        const savedConfig = localStorage.getItem('dialer-config');
        if (savedConfig) {
            setConfig(JSON.parse(savedConfig));
        } else {
            getData();
        }
    }, [])

    return { ...config, groupIndex, setGroupIndex }
};

export default useApp;
