import { StyleSheet, Text, View, Dimensions, Image, Link, ScrollView, Linking } from 'react-native';
import { Marker, Popup, Callout } from 'react-native-maps';
import styled from 'styled-components/native';

import * as Animatable from 'react-native-animatable';
import Button from '../Button';

const MapCallOut = styled(Callout)`
max-width:275px;
// height:100%;
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
const DirectionButton = styled(Button)`
`
const Padding = styled(View)`
padding-top:5px;
`

export default function FoodBankMarker({
   fridges,
   onPopUpPress = () => { { } },
}
) {
   return (<View>
      {fridges.map((fridge) => {
         return <Marker key={fridge.id}
            coordinate={{
               latitude: Number(fridge.latitude),
               longitude: Number(fridge.longitude),
            }}
            image={require('../../assets/Pins/Fridge_Pin.png')}
            style={{ flex: 1 }}
         >
            <MapCallOut onPress={() => { onPopUpPress(); Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${fridge.location}`) }} tooltip >
               <MapPopUp>
                  <Header>{fridge.name}</Header>
                  <Padding><Text><BoldText>Location:</BoldText> {fridge.location}</Text></Padding>
                  <Padding><Text><BoldText>Description:</BoldText> {fridge.description.length < 200 ? fridge.description : fridge.description.substring(0, 200) + "..."}</Text></Padding>
                  <GetDirectionsView>
                     <Padding>
                        <Button txt="Get Directions" width={Dimensions.get('window').width * .35} height={"50px"} />
                     </Padding>
                  </GetDirectionsView>
               </MapPopUp>
            </MapCallOut>
         </Marker>
      })}
   </View>
   )
}