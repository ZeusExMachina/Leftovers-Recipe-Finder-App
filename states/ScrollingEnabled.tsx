import React, { useEffect, useMemo, useState, useContext } from 'react'

const scrollEnabledStateDefaultValue = {
    scrollEnabled: false as boolean,
    setScrollEnabled: (state:boolean) => {}
};

export const ScrollEnabled = React.createContext(scrollEnabledStateDefaultValue);

export default function ScrollingEnabledProvider({ children }) {
    const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);

    const scrollEnabledProviderValue = useMemo(() => ({scrollEnabled,setScrollEnabled}), [scrollEnabled,setScrollEnabled]);

    useEffect(() => {
        console.log("ScrollEnabled useEffect", scrollEnabled);
    }, [scrollEnabled]);

    return (
        <ScrollEnabled.Provider value={scrollEnabledProviderValue}>
            {children}
        </ScrollEnabled.Provider>
    );
}