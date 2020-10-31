import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { Zocial, Fontisto, FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import {getDataJSON} from "../functions/AsyncStorageFunctions";

const SignInScreen = (props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Card>
            <Card.Title>Welcome to the BlogApp!!!</Card.Title>
            <Card.Divider />
            <Input
              leftIcon={<Zocial name="email" size={24} color="black" />}
              placeholder="E-mail Address"
              onChangeText={function (currentInput) {
                setEmail(currentInput);
              }}
            />
            <Input
              leftIcon={<Fontisto name="key" size={24} color="black" />}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={function (currentInput) {
                setPassword(currentInput);
              }}
            />

            <Button
              icon={<SimpleLineIcons name="login" size={24} color="black" />}
              title="   Sign In"
              type="outline"
              onPress={async function () {
                let UserData = await getDataJSON(Email);
                if (UserData.password== Password) {
                  auth.setIsLoggedIn(true);
                  auth.setCurrentUser(UserData);
                } else {
                  alert("Login Failed");
                  console.log(UserData);
                }
              }}
              
            />
            <Button
              icon={
                <FontAwesome name="user-circle-o" size={24} color="black" />
              }
              title="   Don't have an account?"
              type="outline"
              onPress={function () {
                props.navigation.navigate("SignUp");
              }}
            />
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#63a0e5",
  },
});

export default SignInScreen;
