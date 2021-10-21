// 3rd-party Imports
import React, { useState, useMemo } from 'react'

const snackbarVisibleStateDefaultValue = {
    snackbarVisible: false,
    setSnackbarVisible: (state:boolean) => {}
};

export const SnackbarVisible = React.createContext(snackbarVisibleStateDefaultValue);
export const SnackbarMessage = React.createContext("");
export const ShowSnackbarMessage = React.createContext((message:string) => {});

export default function SnackbarVisibleProvider({ children }) {
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const snackbarVisibleProviderValue = useMemo(() => ({snackbarVisible, setSnackbarVisible}), [snackbarVisible, setSnackbarVisible]);

    function showSnackbarMessage(message : string) {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
    }

    return (
        <SnackbarVisible.Provider value={snackbarVisibleProviderValue}>
            <SnackbarMessage.Provider value={snackbarMessage}>
                <ShowSnackbarMessage.Provider value={showSnackbarMessage}>
                    { children }
                </ShowSnackbarMessage.Provider>
            </SnackbarMessage.Provider>
        </SnackbarVisible.Provider>
    );
}
