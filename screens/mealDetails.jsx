import {  Text, Image, ScrollView, StatusBar, Pressable } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function MealDetails({navigation,route}) {
const { meal } = route.params || {};  

  if (!meal) {
    return <Text >Meal not found</Text>;  
  }

  const handleAddToCart = async (product) => {
  try {
    const existingCart = await AsyncStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];
    const updatedCart = [...cart, product];
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  } catch (error) {
    console.error('Failed to add to cart', error);
  }
};

  return (
    <ScrollView className="flex-1  bg-orange-50">
      <StatusBar barStyle="dark-content" backgroundColor="#FEE2B3" />
      <Text >MealDetails</Text>
      <Text className="text-2xl font-bold text-orange-700">{meal.strMeal}</Text>
      <Text className="text-lg text-gray-600">{meal.strCategory}</Text>
      <Text className="text-md text-gray-800 mx-4 mt-2">{meal.strInstructions}</Text>
      <Image source={{ uri: meal.strMealThumb }} style={{width:200 , height:200, marginTop:20}} resizeMode="cover" />
<Pressable
  className="mt-5 px-4 py-2 bg-orange-500 rounded mx-4"
  onPress={() => handleAddToCart({ id: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb, price: meal.price || 10 })}
>
  <Text className="text-white text-lg text-center">Add to Cart</Text>
</Pressable>
      <Pressable className="mt-5 px-4 py-2 bg-gray-400 rounded mx-4 mb-10"
        onPress={() => {
         navigation.pop();
        }}
      >
        <Text className="text-white text-lg text-center">Go Back</Text>
      </Pressable>
 </ScrollView>
  );
}