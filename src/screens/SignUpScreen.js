import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { Zocial, Fontisto, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { storeDataJSON} from "../functions/AsyncStorageFunctions";

const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <View style={styles.viewStyle}>
      <Card>
        <Card.Title>Welcome to the BlogApp!!!</Card.Title>
        <Card.Divider />
        <Input
          leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
          placeholder="Name"
          onChangeText={function (currentInput) {
            setName(currentInput);
          }}
        />
        <Input
          leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
          placeholder="Student ID"
          onChangeText={function (currentInput) {
            setSID(currentInput);
          }}
        />
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
          onChangeText={function (currentInput) {
            setPassword(currentInput);
          }}
          secureTextEntry={true}
        />

        <Button
          icon={<FontAwesome name="user-circle-o" size={24} color="black" />}
          title="   Sign Up"
          type="outline"
          onPress={function(){
            let currentUser={
              name:Name,
              sid:SID,
              email:Email,
              password:Password,
            }
            storeDataJSON(Email,currentUser)
            //console.log(currentUser)
            props.navigation.navigate('SignIn')
          }}
        />
        <Button
          icon={<SimpleLineIcons name="login" size={24} color="black" />}
          title="   Already have an account?"
          type="outline"
          onPress={function () {
            props.navigation.navigate("SignIn");
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#63a0e5",
  },
});

export default SignUpScreen;
