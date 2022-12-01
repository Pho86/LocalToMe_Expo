import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, Link, ScrollView, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { getFoodBanks, getEvents, getPantries, getFridges } from "../server/database";
import { FlexBox, Container } from '../styles';
import AppText from '../components/AppText';
import LottieView from 'lottie-react-native';
import Toast from '../components/Toast';
import { Chou } from '../components/Toast';
import FoodBankMarker from '../components/MapMarkers/FoodBankMarker';
import PantriesMarker from '../components/MapMarkers/PantriesMarker';
import FridgesMarker from '../components/MapMarkers/FridgesMarker';
import EventMarker from '../components/MapMarkers/EventMarker';

export default function MapScreen({ navigation }) {
   const [Loaded, SetLoaded] = useState(false)
   const [DirectionsToast, ShowDirectionsToast] = useState(null);

   const [pantries, setPantries] = useState([]);
   const [fridges, setFridges] = useState([]);
   const [events, setEvents] = useState([]);
   const [food_banks, setBanks] = useState([]);


   const ParseLocationInfo = async () => {
      const foodBanksData = await getFoodBanks();
      const foodBanksList = JSON.parse(JSON.stringify(foodBanksData));
      setBanks(foodBanksList)
      const pantriesData = await getPantries();
      const pantriesList = JSON.parse(JSON.stringify(pantriesData));
      setPantries(pantriesList)
      const eventsData = await getEvents();
      const eventsList = JSON.parse(JSON.stringify(eventsData));
      setEvents(eventsList)
      const fridgeData = await getFridges();
      const fridgeList = JSON.parse(JSON.stringify(fridgeData));
      setFridges(fridgeList);
      SetLoaded(true);
      // setTimeout(() => {
         // setLoading(false);
         // setTimeout(() => {
            // SetLoaded(true);
         // }, 3500);
      // }, 3500);
   }


   const [loading, setLoading] = useState(false);
   useEffect(() => {
      ParseLocationInfo();
      // async function setLoaders() {
      //    setLoading(false);
      //    SetLoaded(true);
      // }
      // async function fetchData() {
      // }
      // fetchData();
   }, [])

   if (loading) {
      return <Container>
         <Animatable.View animation="pulse" easing="ease-in-out" iterationCount={'infinite'} style={{ paddingBottom: 10 }}>
            <AppText txt="Map pins are loading!" size={"28px"} family={"Rubik_700Bold"}></AppText>
         </Animatable.View>
         <LottieView
            autoPlay
            style={{
               width: Dimensions.get('window').width * .45,
               height: Dimensions.get('window').height * .45,
            }}
            source={require('../assets/loading.json')}
         />
      </Container>
   }
   return (
      <View>
         <Container>
            <MapView
               showsUserLocation
               initialRegion={{
                  latitude: 49.256280,
                  longitude: -123.075594,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
               }}
               style={styles.map}
               onPress={() => { if (DirectionsToast === true) ShowDirectionsToast(false) }}
            >
               <FoodBankMarker food_banks={food_banks} onPopUpPress={() => { ShowDirectionsToast(true) }} />
               <PantriesMarker pantries={pantries} onPopUpPress={() => { ShowDirectionsToast(true) }} />
               <FridgesMarker fridges={fridges} onPopUpPress={() => { ShowDirectionsToast(true) }} />
               <EventMarker events={events} onPopUpPress={() => { ShowDirectionsToast(true) }} />
            </MapView>

            {Loaded === false &&
               <Animatable.View
                  animation={{
                     from: {
                        opacity: 0,
                        translateY: 100
                     },
                     to: {
                        opacity: 1,
                        translateY: 0
                     }
                  }}
                  style={styles.container}
               >
                  <Toast txt="Map pins are loading!" source={Chou.Surprised} />
               </Animatable.View>
            }

            {Loaded === true &&
               <Animatable.View
                  animation={{
                     from: {
                        opacity: 1,
                        translateY: 0
                     },
                     to: {
                        opacity: 0,
                        translateY: 100
                     }
                  }}
                  style={styles.container}
                  duration={1250}
                  delay={5000}
               >
                  <Toast txt="All pins have loaded!" />
               </Animatable.View>
            }

            {DirectionsToast === true &&
               <Animatable.View
                  animation={{
                     from: {
                        opacity: 0,
                        translateY: 100
                     },
                     to: {
                        opacity: 1,
                        translateY: 0
                     }
                  }}
                  style={styles.container}
                  duration={1500}
               >
                  <Toast txt="Directions given!" source={Chou.Smug} onPress={() => ShowDirectionsToast(false)} />
               </Animatable.View>
            }

            {DirectionsToast === false &&
               <Animatable.View
                  animation={{
                     from: {
                        opacity: 1,
                        translateY: 0
                     },
                     to: {
                        opacity: 0,
                        translateY: 100
                     }
                  }}
                  style={styles.container}
                  duration={3000}
                  delay={1000}
               >
                  <Toast txt="Directions given!" source={Chou.Smug} onPress={() => ShowDirectionsToast(false)} />
               </Animatable.View>
            }
         </Container>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 100,
      top: Dimensions.get('window').height * .95
   },
   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1,
   },
});