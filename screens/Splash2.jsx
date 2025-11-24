import {View , Text} from 'react-native';
export default function Splash2({navigation}) {
    setTimeout(() => {
        navigation.replace('Home');
    }, 2000);       
    return (
        <View className="flex-1 justify-center items-center bg-orange-50">
            <Text className="text-3xl font-bold text-orange-700">Welcome to Meal App</Text>
        </View>
    );
}