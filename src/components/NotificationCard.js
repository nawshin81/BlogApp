import React from "react";
import {Card} from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';

const NotificationCard=({content})=>{
return(
    <Card>
        <Card.Title title={content.author} subtitle=' commented on your post' left={()=><MaterialIcons name="insert-comment" size={24} color="black" />} />
    </Card>
)
}

export default NotificationCard;