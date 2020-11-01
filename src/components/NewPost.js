import React, { useState } from "react";
import { Card, Button, Input } from "react-native-elements";
import { MaterialCommunityIcons} from "@expo/vector-icons";
import moment from "moment";
import { storeDataJSON} from "../functions/AsyncStorageFunctions";

function CurrentDate() {
  var date = new moment().format("DD/MM/YYYY");
  return date;
}

const NewPost = ({ user }) => {
  const input = React.createRef();
  const [postBody, setpostBody] = useState("");
  return (
    <Card>
      <Input
        placeholder="What's on your mind?"
        leftIcon={
          <MaterialCommunityIcons name="lead-pencil" size={24} color="black" />
        }
        onChangeText={function (currentInput) {
          setpostBody(currentInput);
        }}
        ref={input}
        multiline={true}
      />
      <Button
        title="Post"
        type="outline"
        onPress={function () {
          var id = Math.floor(Math.random() * 200);
          let currentPost = {
            author: user.name,
            date: CurrentDate(),
            post: postBody,
            id: "postId" + id,
          };
          storeDataJSON("postId"+id,currentPost)
          setpostBody("")
          // input.current.clear();
        }}

      />
    </Card>
  );
};
export default NewPost;
