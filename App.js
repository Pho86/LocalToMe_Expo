import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/Map'
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      {/* <View> */}
        <Stack.Navigator initialRouteName='Map'>
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      {/* </View> */}
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });