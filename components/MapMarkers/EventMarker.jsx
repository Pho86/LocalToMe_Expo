import { StyleSheet, Text, View, Dimensions, Image, Link, ScrollView, Linking } from 'react-native';
import { Marker, Popup, Callout } from 'react-native-maps';
import styled from 'styled-components/native';

import * as Animatable from 'react-native-animatable';
import Button from '../Button';

const MapCallOut = styled(Callout)`
max-width:275px;
height:auto;
position:relative;
flex:1;
`
const MapPopUp = styled(View)`
display:flex;
flex-direction:column;
flex:1;
padding:4% 5%;
background:white;
border-radius:20px;
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
const Padding = styled(View)`
padding-top:5px;
`
export default function FoodBankMarker({
   events,
   onPopUpPress = () => { { } },
}
) {
   return (<View>
      {events.map((event) => {
         if (event.latitude && event.longitude) {
            return <Marker key={event.id}
               coordinate={{
                  latitude: Number(event.latitude),
                  longitude: Number(event.longitude),
               }}
               image={require('../../assets/Pins/Event_Pin.png')}
               style={{ flex: 1 }}
            >
               <MapCallOut onPress={() => { onPopUpPress(); Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${event.eventLocation}`) }} tooltip>
                  <MapPopUp>
                     <Header>{event.eventName}</Header>
                     <Padding><Text><BoldText>Location:</BoldText> {event.eventLocation}</Text></Padding>
                     <Padding><Text><BoldText>Description:</BoldText> {event.eventContent.length < 200 ? event.eventContent : event.eventContent.substring(0, 200) + "..."}</Text></Padding>
                     <GetDirectionsView>
                        <Padding>

                           <Button txt="Get Directions" width={Dimensions.get('window').width * .35} height={"50px"} />
                        </Padding>
                     </GetDirectionsView>
                  </MapPopUp>
               </MapCallOut>
            </Marker>
         }
      })}
   </View>
   )
}