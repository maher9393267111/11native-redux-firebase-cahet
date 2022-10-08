import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import { useSelector } from "react-redux";
import { auth, firestore } from "../../../../core/firebase";
import { COLORS } from "../../../constants/colors";
import { selectUser } from "../../../redux/slices/userSlice";
import SwitchTheme from "./SwitchTheme";

const SettingsModal = ({ navigation, funcTodo, modalVisible }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const user = useSelector(selectUser);

  const _NextIcon = "../../../../assets/icons/next_arrow.png";
  const _LogoutIcon = "../../../../assets/icons/logout_icon.png";
  const _SettingsImageIcon = "../../../../assets/images/settings_image.png";
  const _closeIcon = "../../../../assets/icons/close_icon.png";

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleLogout = () => {
    signOut(auth)
      .then(async () => {
        await setOnlineFalse();
        navigation.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        ToastAndroid.show(errorCode.toString(), ToastAndroid.SHORT);
      });
  };

  const setOnlineFalse = async () => {
    try {
      await setDoc(
        doc(firestore, "chatUsers", user.email),
        {
          isOnline: false,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          funcTodo();
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              { backgroundColor: themeMode == "dark" ? "black" : "white" },
            ]}
          >
            <View style={styles.closeModal}>
              <TouchableOpacity onPress={() => funcTodo()}>
                <Image style={styles.closeIcon} source={require(_closeIcon)} />
              </TouchableOpacity>
            </View>
            <Image
              style={{ height: 200, width: 200 }}
              source={require(_SettingsImageIcon)}
            />

            <SwitchTheme isEnabled={isEnabled} toggleSwitch={toggleSwitch} />
            <TouchableOpacity
              style={styles.settingsBtn}
              activeOpacity={0.5}
              onPress={handleLogout}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image style={styles.btnIcon} source={require(_LogoutIcon)} />
                <View
                  style={{
                    justifyContent: "space-between",
                    width: 160,
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 5,
                  }}
                >
                  <Text style={styles.textStyle}>Log Out</Text>
                  <Image style={styles.doBtn} source={require(_NextIcon)} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 40,
    padding: 40,
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#6B7798",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  settingsBtn: {
    backgroundColor: COLORS.settingsBtnColor,
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },
  btnIcon: {
    resizeMode: "contain",
    width: 16,
    height: 16,
    marginRight: 5,
  },
  doBtn: {
    resizeMode: "contain",
    width: 10,
    height: 10,
  },
  closeModal: {
    position: "absolute",
    top: 20,
    right: 20,
    height: 24,
    width: 24,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    height: 16,
    width: 16,
  },
});

export default SettingsModal;
