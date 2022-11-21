import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/Map';
import HomeScreen from './screens/Home';
import HomeScreen2 from './screens/Home2';
import EventScreen from './screens/Events';
import NewsScreen from './screens/News';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
        <Stack.Navigator initialRouteName='Home' 
        screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Home2" component={HomeScreen2} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Events" component={EventScreen} />
          <Stack.Screen name="News" component={NewsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
