import { View, Text, Image } from "react-native";
import React from "react";
import { COLORS } from "../../../constants/colors";
import styles from "../styles";
import moment from "moment";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../core/firebase";

const PeerChatItem = ({ date, sender, text, image }) => {
  const themeMode = useSelector((state) => state.theme.themeMode);
  const [urlImage, seturlImage] = useState();

  useEffect(() => {
    if (image != "") {
      var imageRef = ref(storage, image);
      getDownloadURL(imageRef)
        .then((url) => {
          seturlImage(url);
        })
        .catch((e) => console.log("getting downloadURL of image error => ", e));
    }
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          paddingVertical: 10,
          borderRadius: 12,
          backgroundColor: themeMode == "dark" ? "black" : "white",
        }}
      >
        <Image
          source={{
            uri: "https://avatars.dicebear.com/api/personas/" + sender + ".png",
          }}
          style={styles.peerChatImage}
        />
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: themeMode == "dark" ? COLORS.white : COLORS.black,
                marginRight: 6,
              }}
            >
              {sender}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: themeMode == "dark" ? COLORS.white50 : COLORS.black50,
              }}
            >
              {moment(new Date(date)).fromNow()}
            </Text>
          </View>
          {image == "" ? (
            <Text
              style={{
                fontSize: 15,
                color: themeMode == "dark" ? COLORS.white85 : COLORS.black85,
              }}
            >
              {text}
            </Text>
          ) : (
            <Image
              style={styles.itemMessageImage}
              source={{
                uri: urlImage,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PeerChatItem;
