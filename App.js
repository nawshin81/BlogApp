import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import NotificationScreen from "./src/screens/NotificationScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CommentScreen from "./src/screens/CommentScreen";
import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";
import * as firebase from "firebase"

const AuthStack = createStackNavigator();
const CommentStack = createStackNavigator();
const HomeTab = createMaterialBottomTabNavigator();
const AppDrawer = createDrawerNavigator();
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAr9wqT1jRbXE9PtRo8wb5CtCKEo0AVrcE",
  authDomain: "blog-6617a.firebaseapp.com",
  projectId: "blog-6617a",
  storageBucket: "blog-6617a.appspot.com",
  messagingSenderId: "137615841345",
  appId: "1:137615841345:web:2e268350e9156710fd4ec0"
};
// Initialize Firebase
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}
const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={CommentScreenStack}/>
      <AppDrawer.Screen name="Profile" component={ProfileScreen}/>
    </AppDrawer.Navigator>
  );
};

const HomeTabScreen = () => {
  return (
    <HomeTab.Navigator initialRouteName="Home">
      <HomeTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" color="white" size={26} />
            ) : (
              <AntDesign name="home" color="white" size={22} />
            ),
        }}
      />
      <HomeTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="ios-notifications" size={26} color="white" />
            ) : (
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color="white"
              />
            ),
        }}
      />
    </HomeTab.Navigator>
  );
};
const CommentScreenStack=()=>{
  return(
    <CommentStack.Navigator initialRouteName="Home">
      <CommentStack.Screen name="Home" component={HomeTabScreen} options={{ headerShown: false }}/>
      <CommentStack.Screen name="Comment" component={CommentScreen} options={{ headerShown: false }}/>
    </CommentStack.Navigator>
  )
}

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}
export default App;
