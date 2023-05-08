import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../config/FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View
      style={{
        marginTop: 30,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Pressable style={{ marginVertical: 10 }}>
        <Text>Email : {user.email}</Text>
      </Pressable>

      <Pressable onPress={signOutUser}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
