import {  ThemeContext } from "context/ThemeContext";
import { useContext } from "react";
import { View , Text, Button, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash1({navigation}) {
  const { isDark, setIsDark } = useContext(ThemeContext); 
      return (
        <View className={`${isDark ? "bg-black text-white":" bg-orange-50 " } flex-1 justify-center items-center`}>
            <TouchableOpacity className="absolute top-10 right-5 p-2"
             onPress={() => setIsDark(!isDark)}
            > 
   {isDark? <AntDesign name="moon" size={24} color="white" /> : <AntDesign name="sun" size={24} color="black" /> }
            </TouchableOpacity>
            
            <Text className={`text-3xl ${isDark ? " text-white" : "font-bold text-orange-700"}`}>All your favorites</Text>
            <Text className="text-3xl font-bold text-gray-500">in one place</Text>
        <Button  title ="Next" onPress ={()=>{navigation.replace('Splash2')}}/>
            <Button  title ="Skip" onPress ={()=>{navigation.replace('Home')}}/>
            <Button  title ="Reset Intro" onPress ={async()=>{
              await AsyncStorage.removeItem('introShown');
              alert('Intro has been reset. It will show again on next app launch.');
            }   }/>
        </View>
    );
}