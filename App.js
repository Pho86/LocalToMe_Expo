import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/Map';
import HomeScreen from './screens/Home';
import HomeScreen2 from './screens/Home2';
import EventScreen from './screens/Events';
import NewsScreen from './screens/News';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { Container } from './styles'
import AppText from './components/AppText';
import AnimatedLottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native-animatable';
const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3650);
  }, [])

  if (loading) {
    return <Container>
      <Animatable.View animation="pulse" easing="ease-in-out" iterationCount={'infinite'} style={{paddingBottom:10}}>
        <AppText txt="Welcome to LocalToMe!" size={"24px"} family={"Rubik_700Bold"}></AppText>
      </Animatable.View>
      <LottieView
        autoPlay
        style={{
          width: Dimensions.get('window').width * .45,
          height: Dimensions.get('window').height * .45,
        }}
        source={require('./assets/loading.json')}
      />
    </Container>
  }

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
