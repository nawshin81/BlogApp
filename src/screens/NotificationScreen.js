import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage,FlatList } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "../components/HeaderHome";
import { getDataJSON } from "../functions/AsyncStorageFunctions";
import NotificationCard from "../components/NotificationCard";

const NotificationScreen = (props) => {
  let[notification,setnotification]=useState([])
  const getNotification=async()=>{
    let notice=await getDataJSON('notification')
    if(notice!=null){
      setnotification(notice)
    }
    else{
      console.log('No notification')
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
                if(item.receiver==auth.CurrentUser.name){
                  return(
                    <NotificationCard 
                    content={item}
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
