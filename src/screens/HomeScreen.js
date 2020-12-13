import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  AsyncStorage,
} from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "../components/HeaderHome";
import PostCard from "../components/PostCard";
import NewPost from "../components/NewPost";
import * as firebase from "firebase";
import "firebase/firestore";

const HomeScreen = (props) => {
  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(false);
  const loadPosts = async () => {
    setloading(true);
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at","desc")
      .onSnapshot((querySnapShot) => {
        let temp_posts = [];
        querySnapShot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setposts(temp_posts);
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        alert(error);
      });
    
  };

  useEffect(() => {
    loadPosts();
  }, []);
  
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome navigation={props.navigation} />

          <NewPost user={auth.CurrentUser} />
          <FlatList
            data={posts}
            renderItem={function ({ item }) {
              //console.log({item})
              return (<PostCard   
                author={item.data.author}
                title={item.id}
                body={item.data.body}
                />);
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "black",
  },
  viewStyle: {
    flex: 1,
  },
});

export default HomeScreen;