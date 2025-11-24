import './global.css';
import Meals from "screens/Meals";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import Home from "./screens/Home";
import MealDetails from "./screens/mealDetails";
import Splash1 from './screens/Splash1';
import Splash2 from './screens/Splash2';
import { ThemeProvider } from 'context/ThemeContext';
import {  useState } from 'react';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import { SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <>
    <ThemeProvider  >
 <NavigationContainer>
  <SafeAreaView className=" bg-orange-50"/>
 <Stack.Navigator initialRouteName="Splash1" screenOptions={{headerShown:false}}> 
<Stack.Screen name="Splash1" component={Splash1} />
      <Stack.Screen name="Splash2" component={Splash2} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Meals" component={Meals} />
      <Stack.Screen name="MealDetails" component={MealDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="MealCard" component={MealCard} /> */}


    </Stack.Navigator>
 </NavigationContainer> ​ 
 </ThemeProvider>
    </>
  );
}
