import { Button, Image, Pressable, StatusBar, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { useState } from "react";
export default function Profile() {

    const [img, setImage] = useState(null);
async function uploadImg() {
    // console.log("Selected image URI:", uri);
     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
   let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
}

    return (
        <View>
            <StatusBar barStyle="dark-content" />
            <Text className="text-2xl font-bold text-orange-700 text-center my-4">Profile</Text>
            {img &&
<View className="items-center justify-center mt-1 ">
<Image source={{ uri: img }} style={{ width: 200, height: 200, borderRadius: 100 }} />
<Pressable  onPress={()=>{setImage(null)}} >
    <Text className="text-red-500 mt-2">Remove Picture</Text>
      </Pressable>

</View>
}
            <TouchableOpacity className="mt-2  items-center justify-center"
             onPress={uploadImg} > 
              <Feather name="camera" size={24} color="black" />
             <Text>change profile picture</Text> 
          </TouchableOpacity>


        </View>
    );
}