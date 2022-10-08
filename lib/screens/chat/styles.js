import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  backBtn: {
    backgroundColor: COLORS.black3,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  peerInfos: {
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userProfileImage: {
    height: 34,
    width: 34,
    borderRadius: 75,
    marginRight: 16,
    backgroundColor: "#f0f0f0",
  },
  onlineItem: {
    position: "absolute",
    bottom: 0,
    right: 8,
    height: 16,
    width: 16,
    backgroundColor: COLORS.online,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  peerFullName: {
    fontSize: 16,
    fontWeight: "600",
  },
  isOnlineText: {
    fontSize: 13,
  },
  dashLine: {
    width: "100%",
    height: 1,
    marginTop: 24,
  },
  sendMsgBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 83,
    width: "100%",
    backgroundColor: COLORS.white,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    elevation: 30,
    paddingHorizontal: 40,
    paddingVertical: 32,
    marginTop: 10,
  },
  inputText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    height: 44,
    backgroundColor: COLORS.black3,
    paddingHorizontal: 26,
    paddingVertical: 13,
    marginHorizontal: 20,
  },
  flatChatList: {
    marginHorizontal: 40,
  },
  peerChatImage: {
    height: 52,
    width: 52,
    borderRadius: 75,
    marginRight: 18,
    backgroundColor: "#f0f0f0"
  },
  itemMessageImage: {
    marginTop: 8,
    maxWidth: 400,
    height: 400,
    borderRadius: 10
  },
});
