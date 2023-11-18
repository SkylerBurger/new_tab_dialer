import { useEffect, useState } from 'react';

function useApp() {
    const [ config, setConfig ] = useState(null);
    useEffect(() => {
        async function getData () {
            const response = await fetch('./config.json');
            const parsedConfig = await response.json();
            setConfig(parsedConfig);
        };
        getData();
    }, [])

    return { ...config }
};

export default useApp;
