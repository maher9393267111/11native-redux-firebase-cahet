import React from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../../../redux/slices/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  Switch,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../../constants/colors";

const SwitchTheme = ({ toggleSwitch, isEnabled }) => {
  const dispatch = useDispatch();
  const _DarkModeIcon = "../../../../assets/icons/darkMode_icon.png";

  const storeTheme = async (value) => {
    try {
      await AsyncStorage.setItem("darkMode", value);
    } catch (e) {
      console.log(e);
    }
  };

  const changeTheme = async () => {
    var mode = await AsyncStorage.getItem("darkMode");
    dispatch(setTheme(mode == "light" ? "dark" : "light"));
    mode == "light" ? storeTheme("dark") : storeTheme("light");
  };

  return (
    <>
      <TouchableOpacity
        style={styles.settingsBtn}
        activeOpacity={0.9}
        onPress={async () => {
          toggleSwitch();
          await changeTheme();
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image style={styles.btnIcon} source={require(_DarkModeIcon)} />
          <View
            style={{
              justifyContent: "space-between",
              width: 160,
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <Text style={styles.textStyle}>Dark Mode</Text>
            <Switch
              trackColor={{
                false: COLORS.switchBtnColor,
                true: "#81b0ff",
              }}
              thumbColor={COLORS.white}
              ios_backgroundColor="#3e3e3e"
              height={20}
              onValueChange={async () => {
                toggleSwitch();
                await changeTheme();
              }}
              value={isEnabled}
            />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#6B7798",
    fontWeight: "bold",
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
});

export default SwitchTheme;
