import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MealCard from '../components/MealCard';
export default function Meals({ navigation }) {
  const [meals, setMeals] = useState([]);
const [search, setSearch] = useState('');
  const [filteredMeals, setFilteredMeals] = useState([]);


  async function getMeals() {
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=c`);
      console.log(res.data.meals);
      setMeals(res.data.meals);
      setFilteredMeals(res.data.meals);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMeals();
  }, []);

useEffect(() => {
    const filtered = meals.filter(meal =>
      meal.strMeal.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMeals(filtered);
  }, [search, meals]);


  return (
  <View className="flex-1 bg-orange-50">
    <Text className="text-2xl font-bold text-orange-700 text-center my-4">Meals</Text>
   <Pressable className="mt-5 px-4 py-2 bg-orange-500 rounded"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      >
        <Text className="text-white text-lg">Profile</Text>
      </Pressable>
     <View className="flex-1 bg-orange-50">
      <TextInput
        className="bg-white border border-orange-500 rounded-lg mx-4 my-2 p-2"
        placeholder="Search Meals ... "
        value={search}
        onChangeText={setSearch}
      />

      <FlatList 
      numColumns={2}
      data={filteredMeals}
      renderItem={({item})=><MealCard meal={item}
      navigation={navigation}
      

      />
      }
       />


    </View>
        </View>

  );
}
