import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage, FlatList } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "../components/HeaderHome";
import NewComment from "../components/NewComment";
import CommentCard from "../components/CommentCard";
import { getDataJSON } from "../functions/AsyncStorageFunctions";

const CommentScreen = ({ navigation, route }) => {
  let postId = route.params;
  const [allcomments, setallcomments] = useState([]);
  const [postDetails, setpostDetails] = useState({});

  const getpostdetails = async () => {
    let postDetails = await getDataJSON(postId);
    if (postDetails != null) {
      setpostDetails(postDetails);
    } else {
      console.log("no post");
    }
  };

  const getComments = async () => {
    let keys = await AsyncStorage.getAllKeys();
    let comments = [];
    if (keys != null) {
      for (let key of keys) {
        if (key.startsWith("commentId")) {
          let comment = await getDataJSON(key);
          comments.push(comment);
        }
      }
      setallcomments(comments);
    } else {
      console.log("No keys");
    }
  };

  useEffect(() => {
    getpostdetails();
  }, []);
  useEffect(() => {
    getComments();
  });

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome navigation={navigation} />

          <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {postDetails.author}
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}>{postDetails.date}</Text>
      <Text style={{paddingVertical: 10,fontSize:20}}>
        {postDetails.post}
      </Text>
      <Card.Divider />
      </Card>
          <NewComment postDetails={postDetails} user={auth.CurrentUser.name}/>
          <FlatList 
          data={allcomments}
          renderItem={function({item}){
            
              if(postDetails.id==item.postId){
                return(
                <CommentCard 
              content={item}/>)
              }
              
            
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
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default CommentScreen;
