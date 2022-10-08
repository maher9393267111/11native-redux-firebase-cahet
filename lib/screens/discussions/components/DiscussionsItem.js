import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../styles";
import { useSelector } from "react-redux";
import { COLORS } from "../../../constants/colors";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useLayoutEffect } from "react";
import { firestore } from "../../../../core/firebase";
import { useState } from "react";
import moment from "moment";
import { selectUser } from "../../../redux/slices/userSlice";
import { useMemo } from "react";

const DiscussionsItem = ({ email, fullName, onClick }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const user = useSelector(selectUser);

  const [peerIsOnline, setPeerIsOnline] = useState(null);
  const [lastestMessage, setLastestMessage] = useState(null);
  const [lastestMessageTime, setLastestMessageTime] = useState(null);
  const [document, setDocument] = useState(user.email + "-" + email);
  const emptyLastestMessage = "Write your first Message..";


  // create Initial Chat with All Chat Users when new user in Discussion Screen
  const getDocument = async () => {
    const docRef = doc(firestore, "chatRooms", email + "-" + user.email);
    const docSnap = await getDoc(docRef);

    setDocument(
      docSnap.exists() ? email + "-" + user.email : user.email + "-" + email
    );
    console.log("document:!!!!!!!!!!!!!" + document);
  };

  const getDocumentMemo = useMemo(() => getDocument(), []);

  useLayoutEffect(() => {
    let unsubIsOnline, unsubLastestMsg;
    let mounted = true;

    // ---->  Check if onother user is Online or Not
    unsubIsOnline = onSnapshot(
      doc(firestore, "chatUsers", email),
      (snapshot) => {
        setPeerIsOnline(snapshot.data().isOnline);
      }
    );

    unsubLastestMsg = onSnapshot(
      doc(firestore, "chatRooms", document),
      (snapshot) => {
        if (mounted) {
          if (snapshot.data() != null) {
            const lastestMessage = snapshot.data().lastestMessage;
            setLastestMessage(
              lastestMessage != null ? lastestMessage : emptyLastestMessage
            );
            setLastestMessageTime(snapshot.data().lastestMessageTime);
          } else {
            setLastestMessage(emptyLastestMessage);
          }
        }
      }
    );

    getDocumentMemo;
    unsubIsOnline;
    unsubLastestMsg;

    return () => {
      mounted = false;
    };
  }, [document]);

  return (
    <TouchableOpacity activeOpacity={0.35} onPress={onClick}>
      <View style={{ flexDirection: "column", paddingVertical: 6 }}>
        <View style={styles.discussionsItem}>
          <View>
            <Image
              source={{
                uri:
                  "https://avatars.dicebear.com/api/personas/" +
                  fullName +
                  ".png",
              }}
              style={styles.userProfileImage}
            />
            {peerIsOnline && <View style={styles.onlineItem}></View>}
          </View>
          <View style={{ width: "80%", paddingLeft: 14 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  styles.userFullName,
                  { color: themeMode == "dark" ? "white" : "black" },
                ]}
                numberOfLines={4}
              >
                {fullName}
              </Text>
              <Text
                style={[
                  styles.msgTime,
                  {
                    color:
                      themeMode == "dark" ? COLORS.white50 : COLORS.black50,
                  },
                ]}
              >
                {lastestMessageTime && moment(new Date(lastestMessageTime)).fromNow()}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.msg,
                {
                  fontWeight:
                    lastestMessage != emptyLastestMessage ? "bold" : "normal",
                  color: themeMode == "dark" ? COLORS.white85 : COLORS.black85,
                },
              ]}
            >
              {lastestMessage}
            </Text>
          </View>
        </View>
        <View style={styles.lineItem}></View>
      </View>
    </TouchableOpacity>
  );
};

export default DiscussionsItem;
