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
import SocialLoginBtn from "../../components/SocialLoginBtn";
import { useState } from "react";
import { auth, firestore } from "../../../core/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styles from "./styles";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { login } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const SignUpScreen = ({ navigation }) => {
  const _googleImage = "../../../assets/images/google_icon.png";
  const _fbImage = "../../../assets/images/fb_icon.png";
  const _userIcon = "../../../assets/images/user.png";
  const _emailIcon = "../../../assets/images/email.png";
  const _passwordIcon = "../../../assets/images/password.png";
  const validator = require("validator");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (
      !validator.isEmpty(fullName) &&
      !validator.isEmpty(email) &&
      !validator.isEmpty(password)
    ) {
      if (!validator.isEmail(email))
        ToastAndroid.show("Email is incorrect!", ToastAndroid.SHORT);
      // else if (!validator.isStrongPassword(password))
      //   ToastAndroid.show("Password is not strong enough!", ToastAndroid.SHORT);
      else {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userAuth) => {
            updateProfile(userAuth.user, {
              displayName: fullName,
            });
            dispatch(
              login({
                email: userAuth.user.email,
                fullName: fullName,
              })
            );
            ToastAndroid.show("Welcome!", ToastAndroid.SHORT);
            await saveUserInformation();
            setEmail("");
            setFullName("");
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
      }
    } else {
      ToastAndroid.show("Please input fill in all fields", ToastAndroid.SHORT);
    }
  };


// create userChats when Register Successfully

  const saveUserInformation = async () => {
    try {
      await setDoc(doc(firestore, "chatUsers", email), {
        email: email,
        fullName: fullName,
        isOnline: true,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.BottomContainer}>
            <Text style={styles.title}>Create account,{"\n"}to Continue</Text>
            <View style={styles.inputText}>
              <Image width="24" height="24" source={require(_userIcon)} />
              <TextInput
                style={{ marginLeft: 14 }}
                value={fullName}
                onChangeText={(value) => setFullName(value)}
                placeholder="Full Name"
                keyboardType="default"
                clearButtonMode="always"
                width="80%"
              />
            </View>
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
                secureTextEntry={true}
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
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <ActivityIndicator size="large" color="#d5d5d5" />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={handleSignUp}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
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
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.dontHaveAccountText}>
                Already have an account?{" "}
                <Text style={styles.registerText}>Sign In</Text>
              </Text>
            </Pressable>
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
