import { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        setCartItems(cart ? JSON.parse(cart) : []);
      } catch (error) {
        console.error('Failed to load cart', error);
      }
    };
    loadCart();
  }, []);
  const saveCart = async (newCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      setCartItems(newCart);
    } catch (error) {
      console.error('Error during save to cart', error);
      Alert.alert('error', 'Failed to update cart. Please try again.');
    }
  };
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    saveCart(updatedCart);
  };


  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) - 1;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean); 

    saveCart(updatedCart);
  };

  const removeItem = (id) => {
    Alert.alert(
      ' confirm Deletion',
      ' Are you sure you want to remove this item from the cart?',
      [
        { text: 'close', style: 'cancel' },
        {
          text: 'Confirm ',
          style: 'destructive',
          onPress: () => {
            const updatedCart = cartItems.filter(item => item.id !== id);
            saveCart(updatedCart);
          },
        },
      ]
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <View className="flex-1 p-4 bg-white">
      {cartItems.length === 0 ? (
        <Text className="text-center text-gray-500 mt-20 text-lg">
            Your cart is empty.
        </Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="flex-row bg-gray-50 p-3 rounded-lg mb-3 items-center">
                <Image
                  source={{ uri: item.strMealThumb }}
                  className="w-16 h-16 rounded mr-3"
                />
                <View className="flex-1">
                  <Text className="font-bold text-base">{item.strMeal}</Text>
                  <Text className="text-orange-600 font-semibold">
                    ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 bg-white border border-gray-300 rounded-full justify-center items-center"
                  >
                    <Text className="text-lg">-</Text>
                  </TouchableOpacity>

                  <Text className="mx-2 font-bold w-6 text-center">
                    {item.quantity || 1}
                  </Text>

                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id)}
                    className="w-8 h-8 bg-white border border-gray-300 rounded-full justify-center items-center"
                  >
                    <Text className="text-lg">+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  className="ml-3 p-2"
                >
                  <Text className="text-red-500 font-bold">del</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View className="mt-4 p-4 bg-orange-50 rounded-lg">
            <Text className="text-center text-lg font-bold text-gray-800">
              Total: {totalPrice.toFixed(2)} $
            </Text>
          </View>
        </>
      )}
    </View>
  );
}