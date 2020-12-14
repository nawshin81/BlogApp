import React, { useState } from "react";
import { Card, Button, Input } from "react-native-elements";
import { MaterialCommunityIcons} from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";

const NewPost = ({ user }) => {
  const clearinput = React.createRef();
  const[input,setInput]=useState("");
  const [loading, setloading] = useState(false);
  return (
    <Card>
      <Input
        placeholder="What's on your mind?"
        leftIcon={
          <MaterialCommunityIcons name="lead-pencil" size={24} color="black" />
        }
        onChangeText={function (currentInput) {
          setInput(currentInput);
        }}
        ref={clearinput}
        multiline={true}
      />
      <Button
        title="Post"
        type="outline"
        onPress={function () {
          setloading(true)
          firebase.firestore()
          .collection('posts')
          .add({
            userId:user.uid,
            body:input,
            author:user.displayName,
            created_at:firebase.firestore.Timestamp.now(),
            likes:[],
            comments:[],
          })
          .then((doc)=>{
            setloading(false)
            alert(doc.id)
          }),(error)=>{
            setloading(false)
            alert(error);
          }
          // .catch((error)=>{
          //   setloading(false)
          //   alert(error);
          // })
          clearinput.current.clear();
        }}

      />
    </Card>
  );
};
export default NewPost;
