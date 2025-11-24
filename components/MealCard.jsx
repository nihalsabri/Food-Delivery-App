import { View, Text, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MealCard({ meal }) {
    const handleAddToCart = async (product) => {
  try {
    const existingCart = await AsyncStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];
    const updatedCart = [...cart, product];
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
setModalVisible(true)

  } catch (error) {
    console.error('Failed to add to cart', error);
  }
};
   const navigation = useNavigation();
  function handleViewDetails() {
    navigation.navigate('MealDetails', {  meal: meal });
  }
    const [modalVisible, setModalVisible] = useState(false);

  return (
    
    <View  key={meal.idMeal} className="m-2 p-3 border-2 border-orange-500 rounded-xl bg-white shadow w-50">
      <Image source={{ uri: meal.strMealThumb }} style={{width:100 , height:100}} resizeMode="cover" />
  <Text className="text-lg font-bold text-center" numberOfLines={1}>
        {meal.strMeal}</Text>
      <Text className="text-gray-600">{meal.strCategory}</Text>

      {/* <TouchableOpacity  onPress={()=>{setModalVisible(true)}}  className="mt-2 bg-orange-500 p-2 rounded-lg">
        <Text className="text-white text-center font-semibold">add to cart</Text>
      </TouchableOpacity> */}

      <Pressable
        className="mt-2 p-2 bg-orange-500 rounded-lg "
        onPress={() => handleAddToCart({ id: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb, price: meal.price || 10 })}
      >
        <Text className="text-white text-lg text-center">Add to Cart</Text>
      </Pressable>
           <TouchableOpacity onPress={handleViewDetails} className="mt-2 bg-gray-400 p-2 rounded-lg">
        <Text className="text-white text-center font-semibold">view detials</Text>
      </TouchableOpacity>


      <Modal         visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
      <View className="flex-1 justify-center items-center bg-black/80 bg-opacity-20">
        <View className="bg-white p-4 rounded-lg w-70">
          <Text className="text-xl font-bold mb-2">{meal.strMeal}</Text>
          <Image source={{ uri: meal.strMealThumb }} style={{width:200 , height:200}} resizeMode="cover" className="mb-2" />
          <Text className="mb-4">Meal added Successfully</Text>

 <Pressable className="mt-5 py-2 bg-orange-500 rounded-lg"
        onPress={() => {
          // Navigate to Meals screen
          navigation.navigate('Cart');
        }}
      >
        <Text className="text-white  text-center font-semibold text-lg">Go to Cart</Text>
      </Pressable>

          <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-orange-500 p-2 rounded-lg">
            <Text className="text-white text-center font-semibold">Close</Text>
          </TouchableOpacity>


        </View>
      </View>
      </Modal>
    </View>
  );
}