import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  AsyncStorage,
} from "react-native";
import { Input, Button, Card, Text } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import HeaderHome from "../components/HeaderHome";
import PostCard from "../components/PostCard";
import NewPost from "../components/NewPost";
import {getDataJSON } from "../functions/AsyncStorageFunctions";

const HomeScreen = (props) => {
  const [allposts, setallposts] = useState([]);
  //console.log(props)
  const getPosts = async () => {
    let keys = await AsyncStorage.getAllKeys();
    console.log('new ')
    //console.log(keys)
    let posts = [];
    if (keys != null) {
      for (let key of keys) {
        if(key.startsWith("postId")){
          let post = await getDataJSON(key);
          posts.push(post);
        } 
      }
      setallposts(posts);
    }
    else{
      console.log('No keys')
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome navigation={props.navigation} />

          <NewPost user={auth.CurrentUser} />
          <FlatList
            data={allposts}
            renderItem={function ({ item }) {
              return (<PostCard 
                content={item}
                props={props} 
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
