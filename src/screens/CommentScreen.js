import React, { useEffect, useState } from "react";
import { View, StyleSheet, AsyncStorage, FlatList } from "react-native";
import { Text, Card, Avatar } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import HeaderHome from "../components/HeaderHome";
import NewComment from "../components/NewComment";
import CommentCard from "../components/CommentCard";
import * as firebase from "firebase";
import "firebase/firestore";

const CommentScreen = ({ navigation, route }) => {
  let postId = route.params.post;
  const [allcomments, setallcomments] = useState([]);
  const [postDetails, setpostDetails] = useState({});

  const getpostdetails = async () => {
    firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        setpostDetails(doc.data())
         console.log(doc.data());
      } else {
          console.log("No such post!");
      }
  }).catch(function(error) {
      console.log(error);
  });
  };
//console.log(postDetails);
  const getComments = async () => {
    firebase
    .firestore()
    .collection("comments")
    .onSnapshot((snapshot)=>{
      let temp_comments=[]
      snapshot.forEach((doc)=>{
        temp_comments.push( {
            id:doc.id,
            data:doc.data()
          } )
      })
      setallcomments(temp_comments)
      ,function(error) {
        alert(error)
    }
    })
  };
//console.log(allcomments)
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
        {postDetails.body}
      </Text>
      <Card.Divider />
      </Card>
          <NewComment postDetails={postDetails} postId={postId} user={auth.CurrentUser.displayName}/>
          <FlatList 
          data={allcomments}
          renderItem={function({item}){
            //console.log(item.postId)
              if(postId==item.data.postId){
                return(
                <CommentCard 
              content={item.data}/>)
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
