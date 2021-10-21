// 3rd-party imports
import React, { useContext } from "react";
import { Snackbar } from "react-native-paper";
// States
import { SnackbarVisible, SnackbarMessage } from "../states/SnackbarVisible";

const SnackbarMessagePopup = () => {
    const {snackbarVisible, setSnackbarVisible} = useContext(SnackbarVisible);
    const snackbarMessage : string = useContext(SnackbarMessage);

    return (
      <Snackbar
        style={{ alignSelf:"center", width:"91%", marginBottom:65 }}
        visible={snackbarVisible}
        onDismiss={() => {setSnackbarVisible(false)}}
        action={{
          label: 'OK',
          onPress: () => {setSnackbarVisible(false)}
        }}
      >
        { snackbarMessage }
      </Snackbar>
    );
}

export default SnackbarMessagePopup;