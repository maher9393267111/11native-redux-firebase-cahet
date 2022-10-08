import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 40,
    paddingTop: 50,
    paddingBottom: 40,
    width: "100%",
  },
  logoutBtn: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  discussionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  myProfileImage: {
    width: 46,
    height: 46,
    borderRadius: 50,
    resizeMode: "cover",
    marginRight: 16,
    backgroundColor: "#eeeeee",
  },
  discussionsText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profileNotifications: {
    position: "absolute",
    top: -10,
    left: 30,
    height: 24,
    width: 24,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.white,
    backgroundColor: COLORS.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  profileNotificationsText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.white,
  },
  separation: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.black6,
  },
  discussionsBody: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 40,
    marginTop: 35,
  },
  lastMessagesTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
  },
  discussionsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userProfileImage: {
    height: 60,
    width: 60,
    borderRadius: 75,
    backgroundColor: "#f0f0f0",
  },
  userFullName: {
    fontSize: 16,
    fontWeight: "600",
    width:"60%"
  },
  msgTime: {
    fontSize: 12,
  },
  msg: {
    flexShrink: 1,
  },
  onlineItem: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 20,
    width: 20,
    backgroundColor: COLORS.online,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  lineItem: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.black3,
    marginTop: 14,
  },
});
