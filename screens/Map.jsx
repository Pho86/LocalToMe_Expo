import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, Link, ScrollView, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Popup, Callout } from 'react-native-maps';
import styled from 'styled-components/native';
import { getFoodBanks, getEvents, getPantries, getFridges } from "../server/database";
import { useState, useEffect } from 'react';
import Toast from '../components/Toast';
import * as Animatable from 'react-native-animatable';
import { FlexBox, Container } from '../styles';
import { Chou } from '../components/Toast';
import Button from '../components/Button';

const MapCallOut = styled(Callout)`
max-width:275px;
`

const MapPopUp = styled(View)`
padding:4% 5%;
background:white;
height:275px;
border-radius:20px;
flex:1;
display:flex;
flex-direction:column;
`

const Header = styled(Text)`
fontSize:18px;
fontWeight:800;
`

const BoldText = styled(Text)`
fontWeight:600;
`
const GetDirectionsView = styled(View)`
align-self:center;   
display:flex;
`
const DirectionButton = styled(Button)`
`

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
      SetLoaded(true)
      const eventsData = await getEvents();
      const eventsList = JSON.parse(JSON.stringify(eventsData));
      setEvents(eventsList)
      const fridgeData = await getFridges();
      const fridgeList = JSON.parse(JSON.stringify(fridgeData));
      setFridges(fridgeList);
   }

   useEffect(() => {
      SetLoaded(false);
      ParseLocationInfo();

   }, []);

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
               onPress={() => ShowDirectionsToast(false)}
            >

               {food_banks.map((food_bank) => {
                  if (food_bank.latitude && food_bank.longitude) {
                     return <Marker key={food_bank.id}
                        coordinate={{
                           latitude: Number(food_bank.latitude),
                           longitude: Number(food_bank.longitude),
                        }}
                        image={require('../assets/Pins/Food_Bank_Pin.png')}
                        style={{flex:1}}
                     >
                        <MapCallOut tooltip onPress={() => { ShowDirectionsToast(true); Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${food_bank.location_address}`) }} style={{flex:1}}>
                           <MapPopUp>
                              <View>

                              <Header>{food_bank.program_name}</Header>
                              <Text><BoldText>Location:</BoldText> {food_bank.location_address}</Text>
                              {food_bank.organization_name && <Text><BoldText>Organization Name:</BoldText> {food_bank.organization_name}</Text>}
                              {food_bank.signup_email && <Text><BoldText>Email:</BoldText> {food_bank.signup_email}</Text>}
                              {food_bank.description && <Text><BoldText>Description:</BoldText> {food_bank.description.length < 250 && food_bank.description}{food_bank.description.length > 250 && food_bank.description.substring(0, 250) + "..."}</Text>}
                              <GetDirectionsView>
                              <Button txt="Get Directions" width={Dimensions.get('window').width * .35} height={"50px"}/>
                           </GetDirectionsView>
                              </View>
                           </MapPopUp>
                        </MapCallOut>
                     </Marker>
                  }
               })}

               {pantries.map((pantry) => {
                  return <Marker key={pantry.id}
                     coordinate={{
                        latitude: Number(pantry.latitude),
                        longitude: Number(pantry.longitude),
                     }}
                     image={require('../assets/Pins/Pantry_Pin.png')}
                  >
                     <MapCallOut onPress={() => { ShowDirectionsToast(true); Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${pantry.location}`) }} tooltip >
                        <MapPopUp>
                           <Header>{pantry.name}</Header>
                           <Text><BoldText>Location:</BoldText> {pantry.location}</Text>
                           <Text><BoldText>Description:</BoldText> {pantry.description.length < 250 && pantry.description}{pantry.description.length > 250 && pantry.description.substring(0, 250) + "..."}</Text>
                           <GetDirectionsView>
                              <Button txt="Get Directions" width={Dimensions.get('window').width * .35} height={"50px"}/>
                           </GetDirectionsView>
                        </MapPopUp>
                     </MapCallOut>
                  </Marker>
               })}

               {fridges.map((fridge) => {
                  return <Marker key={fridge.id}
                     coordinate={{
                        latitude: Number(fridge.latitude),
                        longitude: Number(fridge.longitude),
                     }}
                     image={require('../assets/Pins/Fridge_Pin.png')}
                  >
                     <MapCallOut onPress={() => { ShowDirectionsToast(true); Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${fridge.location}`) }} tooltip >
                        <MapPopUp>
                           <Header>{fridge.name}</Header>
                           <Text><BoldText>Location:</BoldText> {fridge.location}</Text>
                           <Text><BoldText>Description:</BoldText> {fridge.description.length < 250 && fridge.description}{fridge.description.length > 250 && fridge.description.substring(0, 250) + "..."}</Text>
                           <GetDirectionsView>
                              <Button txt="Get Directions" width={Dimensions.get('window').width * .35} height={"50px"}/>
                           </GetDirectionsView>
                        </MapPopUp>
                     </MapCallOut>
                  </Marker>
               })}

               {events.map((event) => {
                  if (event.latitude && event.longitude) {
                     return <Marker key={event.id}
                        coordinate={{
                           latitude: Number(event.latitude),
                           longitude: Number(event.longitude),
                        }}
                        image={require('../assets/Pins/Event_Pin.png')}
                     >
                        <MapCallOut onPress={() => { ShowDirectionsToast(true); Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${event.eventLocation}`) }} tooltip >
                           <MapPopUp>
                              <Header>{event.eventName}</Header>
                              <Text><BoldText>Location:</BoldText> {event.eventLocation}</Text>
                              <Text><BoldText>Description:</BoldText> {event.eventContent.length < 250 && event.eventContent}{event.eventContent.length > 250 && event.eventContent.substring(0, 250) + "..."}</Text>
                              <GetDirectionsView>
                              <Button txt="Get Directions" width={Dimensions.get('window').width * .35} height={"50px"}/>
                           </GetDirectionsView>
                           </MapPopUp>
                        </MapCallOut>
                     </Marker>
                  }
               })}

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
                  duration={500}
                  delay={0}
               >
                  <Toast txt="Your pins are loading!" source={Chou.Surprised} />
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
                  delay={3500}
               >
                  <Toast txt="Your pins have loaded!" />
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
                  <Toast txt="Directions have been given!" source={Chou.Happy} onPress={() => ShowToasty(false)} />
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
                  duration={1500}
                  delay={250}
               >
                  <Toast txt="Directions have been given!" source={Chou.Happy} onPress={() => ShowToasty(false)} />
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