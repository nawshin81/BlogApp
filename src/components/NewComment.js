import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { storeDataJSON } from "../functions/AsyncStorageFunctions";
import NotificationFunction from "../functions/NotificationFunction";
const NewComment = ({ postDetails, user }) => {
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
                var id = Math.floor(Math.random() * 200);
                let currentComment = {
                  postId: postDetails.id,
                  comment: comment,
                  author: user,
                  receiver: postDetails.author,
                  commentId: "commentId" + id,
                };
                storeDataJSON("commentId" + id, currentComment);
                NotificationFunction(currentComment)
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

const styles = StyleSheet.create({
  cardStyle: {},
});

export default NewComment;
