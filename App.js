import { StatusBar } from 'expo-status-bar';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import Meals from 'screens/Meals';

export default function App() {
  return (
    <>
    <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="auto" />

      <Meals />
    </SafeAreaView> 
    </>
  );
}
