import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage,FlatList } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "../components/HeaderHome";
import NotificationCard from "../components/NotificationCard";
import * as firebase from "firebase";
import "firebase/firestore";

const NotificationScreen = (props) => {
  let[notification,setnotification]=useState([])

  const getNotification=async()=>{
    firebase
    .firestore()
    .collection('comments')
    .onSnapshot((querySnapshot)=>{
      let allNots=[]
      querySnapshot.forEach((doc)=>{
        allNots.push({
          id:doc.id,
          data:doc.data(),
        });
      });
      setnotification(allNots)
    }),function(error){
      alert(error)
    }
  }

  useEffect(()=>{
    getNotification()
  },[])
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome navigation={props.navigation}/>
            <View style={{ flexDirection: "row" }}>
              <FlatList 
              data={notification}
              renderItem={function({item}){
                if(item.data.receiver==auth.CurrentUser.displayName){
                  return(
                    <NotificationCard 
                    content={item.data}
                    />
                  )
                }
              }}
              keyExtractor={(item, index) => index.toString()}
              />
            </View>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;