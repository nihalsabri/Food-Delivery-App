import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';

export default function MealCard({ meal }) {
    const [modalVisible, setModalVisible] = useState(false);

  return (
    
    <View  key={meal.idMeal} className="m-2 p-3 border-2 border-orange-500 rounded-xl bg-white shadow w-50">
      <Image source={{ uri: meal.strMealThumb }} style={{width:100 , height:100}} resizeMode="cover" />
  <Text className="text-lg font-bold text-center" numberOfLines={1}>
        {meal.strMeal}</Text>
      <Text className="text-gray-600">{meal.strCategory}</Text>

      <TouchableOpacity  className="mt-2 bg-orange-500 p-2 rounded-lg">
        <Text onPress={()=>{setModalVisible(true)}} className="text-white text-center font-semibold">add to cart</Text>
      </TouchableOpacity>

      <Modal         visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
      <View className="flex-1 justify-center items-center bg-black/40 bg-opacity-50">
        <View className="bg-white p-4 rounded-lg w-70">
          <Text className="text-xl font-bold mb-2">{meal.strMeal}</Text>
          <Image source={{ uri: meal.strMealThumb }} style={{width:200 , height:200}} resizeMode="cover" className="mb-2" />
          <Text className="mb-4">Meal added Successfully</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-orange-500 p-2 rounded-lg">
            <Text className="text-white text-center font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Modal>
    </View>
  );
}