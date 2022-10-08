import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 55,
      marginVertical: 100,
    },
    image: {
      height: 165,
      resizeMode: "contain",
    },
    BottomContainer: {
      marginTop: 20,
      width: "100%",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 8,
    },
    inputText: {
      flexDirection: "row",
      borderRadius: 10,
      height: 59,
      backgroundColor: COLORS.black3,
      marginTop: 16,
      paddingHorizontal: 20,
      paddingVertical: 18,
    },
    button: {
      alignItems: "center",
      backgroundColor: COLORS.black,
      marginTop: 25,
      paddingVertical: 18,
      borderRadius: 20,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },
    circleBtns: {
      marginTop: 24,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    dontHaveAccountText: {
      marginTop: 28,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      fontSize: 16,
      color: COLORS.black65,
    },
    registerText: {
      fontWeight: "bold",
      color: COLORS.black,
    },
  });