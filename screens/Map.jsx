import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Button, Image, Link, ScrollView, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Popup, Callout } from 'react-native-maps';
import styled from 'styled-components/native';
import { getFoodBanks, getEvents, getPantries, getFridges } from "../server/database";
import { useState, useEffect } from 'react';

const MapCallOut = styled(Callout)`
max-width:275px;
height:275px;
background:white;
padding:3% 4%;
`

const MapPopUp = styled(View)`
// width:100%;
// max-height:500px;
// min-height:150px;
`
const Header = styled(Text)`
fontSize:18px;
fontWeight:800;
`

const BoldText = styled(Text)`
fontWeight:500;
`

export default function MapScreen({ navigation }) {
   const [pantries, setPantries] = useState([]);
   const [fridges, setFridges] = useState([]);
   const [events, setEvents] = useState([]);
   const [food_banks, setBanks] = useState([]);
   const parseLocationInfo = async () => {
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
      setFridges(fridgeList)
   }

   useEffect(() => {
      parseLocationInfo();
   }, []);

   // <Button onPress={()=>parseLocationInfo()} title="test"> </Button>
   return (
      <View style={styles.container}>
         <MapView
            initialRegion={{
               latitude: 49.256280,
               longitude: -123.075594,
               latitudeDelta: 0.1,
               longitudeDelta: 0.1,
            }}
            showsUserLocation
            style={styles.map}
         >
            
            {food_banks.map((food_bank) => {
               if (food_bank.latitude && food_bank.longitude) {
                  return <Marker key={food_bank.id}
                     coordinate={{
                        latitude: Number(food_bank.latitude),
                        longitude: Number(food_bank.longitude),
                     }}
                     image={require('../assets/Food_Bank_Pin.png')}
                  >
                     <MapCallOut tooltip onPress={() => { Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${food_bank.location_address}`) }} >
                        <Header>{food_bank.program_name}</Header>
                        <Text><BoldText>Location:</BoldText> {food_bank.location_address}</Text>
                        {food_bank.organization_name && <Text><BoldText>Organization Name:</BoldText> {food_bank.organization_name}</Text>}
                        {food_bank.signup_email && <Text><BoldText>Email:</BoldText> {food_bank.signup_email}</Text>}
                        {food_bank.description && <Text><BoldText>Description:</BoldText> {food_bank.description.substring(0, 250) + "..."}</Text>}
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
                  image={require('../assets/Pantry_Pin.png')}
               >
                  <MapCallOut onPress={() => { Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${pantry.location}`) }} tooltip >
                     <MapPopUp>
                        <Header>{pantry.name}</Header>
                        <Text><BoldText>Location:</BoldText> {pantry.location}</Text>
                        <Text><BoldText>Description:</BoldText> {pantry.description.substring(0, 250) + "..."}</Text>
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
                  image={require('../assets/Fridge_Pin.png')}
               >
                  <MapCallOut onPress={() => { Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${fridge.location}`) }} tooltip >
                     <MapPopUp>
                        <Header>{fridge.name}</Header>
                        <Text><BoldText>Location:</BoldText> {fridge.location}</Text>
                        <Text><BoldText>Description:</BoldText> {fridge.description.substring(0, 250) + "..."}</Text>
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
                     image={require('../assets/Event_Pin.png')}
                  >
                     <MapCallOut onPress={() => { Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${fridge.eventLocation}`) }} tooltip >
                        <MapPopUp>
                           <Header>{event.eventName}</Header>
                           <Text><BoldText>Location:</BoldText> {event.eventLocation}</Text>
                           <Text><BoldText>Description:</BoldText> {event.eventContent.substring(0, 250) + "..."}</Text>
                        </MapPopUp>
                     </MapCallOut>
                  </Marker>
               }
            })}


         </MapView>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
   },
   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex:1,
   },
});