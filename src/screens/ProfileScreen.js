import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "../components/HeaderHome";

const NotificationScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome navigation={props.navigation} />
          <View style={{ borderTopWidth: 35 }} />
          <Avatar
            size={150}
            avatarStyle={{ alignItems: "center" }}
            rounded
            source={{
              uri: "https://picsum.photos/200/300",
            }}
          />

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Text
              style={{
                paddingHorizontal: 10,
                fontSize: 25,
                marginBottom: 20,
                alignContent: "center",
              }}
            >
              {auth.CurrentUser.name}
            </Text>
          </View>
          <View style={{alignSelf:'flex-start'}}>
            <Text style={styles.textStyle}>Born On: Not added</Text>
            <Text style={styles.textStyle}>Address: Not added</Text>
            <Text style={styles.textStyle}>Works at: Not added</Text>
          </View>
          <Button
            title = 'Delete Account'
            type = 'outline'
            />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: "black",
    textAlign: "left",
    marginBottom: 15,
    marginLeft:15
  },
  viewStyle: {
    flex: 1,
    alignItems: "center",
  },
});

export default NotificationScreen;
