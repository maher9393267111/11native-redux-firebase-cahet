import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import SocialLoginBtn from "../../components/SocialLoginBtn";
import styles from "./styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../core/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";

const SignInScreen = ({ navigation }) => {
  const _topImage = "../../../assets/images/sign_in_top_image.png";
  const _googleImage = "../../../assets/images/google_icon.png";
  const _fbImage = "../../../assets/images/fb_icon.png";
  const _emailIcon = "../../../assets/images/email.png";
  const _passwordIcon = "../../../assets/images/password.png";
  const validator = require("validator");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!validator.isEmpty(email) && !validator.isEmpty(password)) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userAuth) => {
          dispatch(
            login({
              email: userAuth.user.email,
              fullName: userAuth.user.displayName,
            })
          );
          ToastAndroid.show("Welcome!", ToastAndroid.SHORT);
          await setOnlineTrue();
          setEmail("");
          setPassword("");
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "Discussions" }],
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          ToastAndroid.show(errorCode.toString(), ToastAndroid.SHORT);
          setLoading(false);
        });
    } else {
      ToastAndroid.show("Please input fill in all fields", ToastAndroid.SHORT);
    }
  };

  const setOnlineTrue = async () => {
    try {
      await setDoc(
        doc(firestore, "chatUsers", email),
        {
          isOnline: true,
        },
        { merge: true }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.image} source={require(_topImage)} />
          <View style={styles.BottomContainer}>
            <Text style={styles.title}>Hello,{"\n"}Login to Continue</Text>
            <View style={styles.inputText}>
              <Image width="24" height="24" source={require(_emailIcon)} />
              <TextInput
                style={{ marginLeft: 14 }}
                value={email}
                onChangeText={(value) => setEmail(value)}
                placeholder="Email address"
                keyboardType="email-address"
                width="80%"
              />
            </View>
            <View style={styles.inputText}>
              <Image width="24" height="24" source={require(_passwordIcon)} />
              <TextInput
                secureTextEntry
                style={{ marginLeft: 14 }}
                value={password}
                onChangeText={(value) => setPassword(value)}
                placeholder="Password"
                keyboardType="default"
                width="80%"
              />
            </View>
            {loading ? (
              <View
                style={{
                  paddingVertical: 20,
                  alignSelf: "center",
                }}
              >
                <ActivityIndicator size="large" color="#d5d5d5" />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}
            <View style={styles.circleBtns}>
              <SocialLoginBtn
                socialName="Google"
                socialImage={require(_googleImage)}
              />
              <SocialLoginBtn
                socialName="Facebook"
                socialImage={require(_fbImage)}
              />
            </View>
            <Pressable onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.dontHaveAccountText}>
                Don't have account?{" "}
                <Text style={styles.registerText}>Register</Text>
              </Text>
            </Pressable>
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
