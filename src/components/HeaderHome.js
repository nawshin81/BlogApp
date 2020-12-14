import React from "react";
import { Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import * as firebase from "firebase";

const HeaderHome = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Header
          leftComponent={{
            icon: "menu",
            color: "#fff",
            onPress: function () {
              props.navigation.toggleDrawer();
            },
          }}
          centerComponent={{
            text: "BlogApp",
            style: { color: "#fff", fontSize: 30 },
          }}
          rightComponent={{
            icon: "lock-outline",
            color: "#fff",
            onPress: function () {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                })
                ,(error) => {
                  alert(error);
                }
            },
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};
export default HeaderHome;
