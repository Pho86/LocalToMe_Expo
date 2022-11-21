import { StyleSheet, Text, View, Dimensions, Image, Link, ScrollView, Linking } from 'react-native';
import { Marker, Popup, Callout } from 'react-native-maps';
import styled from 'styled-components/native';
import AppText from '../AppText';
import { Colours } from '../../styles';

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
const DirectionButton = styled(Button)`
`

const Padding = styled(View)`
padding-top:5px;
`

export default function PantriesMarker({
   pantries,
   onPopUpPress = () => { { } },
}
) {
   return (<View>
      {pantries.map((pantry) => {
         return <Marker key={pantry.id}
            coordinate={{
               latitude: Number(pantry.latitude),
               longitude: Number(pantry.longitude),
            }}
            image={require('../../assets/Pins/Pantry_Pin.png')}
            style={{ flex: 1 }}
         >
            <MapCallOut onPress={() => { onPopUpPress(); Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${pantry.location}`) }} tooltip >
               <MapPopUp style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderBottomColor: Colours.primary, borderBottomWidth: 20 }}>
                  <AppText txt={pantry.name} size={"18px"} family={"Rubik_600SemiBold"}></AppText>
                  <Padding><Text><BoldText>Location: </BoldText><AppText txt={pantry.location} size={"14px"}> </AppText></Text></Padding>
                  <Padding><Text><BoldText>Description: </BoldText><AppText txt={pantry.description.length < 200 ? pantry.description : pantry.description.substring(0, 200) + "..."} size={"14px"}> </AppText></Text></Padding>
                  <GetDirectionsView>
                     <Padding>
                        <Button txt="Get Directions" width={Dimensions.get('window').width * .35} height={"45px"} />
                     </Padding>
                  </GetDirectionsView>
               </MapPopUp>
            </MapCallOut>
         </Marker>
      })}
   </View>
   )
}