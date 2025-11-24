import React from 'react';
import { View, Text, Pressable } from 'react-native';  

export default function Home({ navigation }) {

  return  (
    <View className="flex-1 justify-center items-center bg-orange-50">
      <Text className="text-3xl font-bold text-orange-700">Welcome to Meal App</Text>
      <Pressable className="mt-5 px-4 py-2 bg-orange-500 rounded"
        onPress={() => {
          // Navigate to Meals screen
          navigation.navigate('Meals');
        }}
      >
        <Text className="text-white text-lg">Go to Meals</Text>
      </Pressable>
    </View>

  );
}   