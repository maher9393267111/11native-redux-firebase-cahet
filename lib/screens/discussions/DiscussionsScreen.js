import React from "react";
import {
  AppState,
  SafeAreaView,
  ScrollView,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import DiscussionsHeader from "./components/DiscussionsHeader";
import styles from "./styles";
import DiscussionsItem from "./components/DiscussionsItem";
import { useSelector } from "react-redux";
import { COLORS } from "../../constants/colors";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../../../core/firebase";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { selectUser } from "../../redux/slices/userSlice";

const DiscussionsScreen = ({ navigation }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const [usersList, setUsersList] = useState([]);
  const user = useSelector(selectUser);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      updateSetOnline(true);
    } else {
      updateSetOnline(false);
    }

    appState.current = nextAppState;
    console.log("AppState", appState.current);
  };

  const updateSetOnline = async (status) => {
    try {
      await setDoc(
        doc(firestore, "chatUsers", user.email),
        {
          isOnline: status,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useLayoutEffect(() => {
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(collection(firestore, "chatUsers"));
      setUsersList(
        querySnapshot.docs.map((doc) => ({
          email: doc.data().email,
          fullName: doc.data().fullName,
          isOnline: doc.data().isOnline,
        }))
      );
    };
    getAllUsers();
    console.log(usersList);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeMode == "dark" ? "black" : "white",
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <DiscussionsHeader navigation={navigation} />
          <View style={styles.separation}></View>
          <View style={styles.discussionsBody}>
            <Text
              style={[
                styles.lastMessagesTitle,
                {
                  color: themeMode == "dark" ? COLORS.white65 : COLORS.black65,
                },
              ]}
            >
              Last messages
            </Text>
            {usersList.length > 0 ? (
              usersList.map((item) => {
                return (
                  <DiscussionsItem
                    key={item.email}
                    email={item.email}
                    fullName={item.fullName}
                    onClick={() =>
                      navigation.navigate("Chat", {
                        peerEmail: item.email,
                      })
                    }
                  />
                );
              })
            ) : (
              <View style={{ alignSelf: "center" }}>
                <ActivityIndicator size="large" />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiscussionsScreen;
