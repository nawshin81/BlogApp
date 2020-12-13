import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import * as firebase from "firebase";
import "firebase/firestore";

const NewComment = ({ postDetails, postId, user }) => {
  const input = React.createRef();
  const [comment, setcomment] = useState("");
  return (
    <Card>
      <View style={{ flexDirection: "row" }}>
        <Input
          placeholder="Comment Here"
          onChangeText={function (input) {
            setcomment(input);
          }}
          rightIcon={
            <Button
              title="Comment"
              type="outline"
              onPress={function () {
                firebase
                  .firestore()
                  .collection("comments")
                  .add({
                    postId: postId,
                    comment: comment,
                    author: user,
                    receiver: postDetails.author,
                  })
                  .then(() => {})
                  .catch((error) => {
                    alert(error);
                  });
                setcomment("");
                input.current.clear();
              }}
            />
          }
          multiline={true}
          ref={input}
        />
      </View>
    </Card>
  );
};

export default NewComment;
