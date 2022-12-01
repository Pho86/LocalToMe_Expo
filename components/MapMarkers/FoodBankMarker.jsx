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
const Padding = styled(View)`
padding-top:5px;
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

export default function FoodBankMarker({
   food_banks,
   onPopUpPress = () => { { } },
}
) {
   return (<View>
      {food_banks.map((food_bank) => {
         if (food_bank.latitude && food_bank.longitude) {
            return <Marker key={food_bank.id}
               coordinate={{
                  latitude: Number(food_bank.latitude),
                  longitude: Number(food_bank.longitude),
               }}
               image={require('../../assets/Pins/Food_Bank_Pin.png')}
               tracksViewChanges={false}
               style={{ flex: 1 }}
            >
               <MapCallOut tooltip onPress={() => { onPopUpPress(); Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${food_bank.location_address}`) }}>
                  <MapPopUp>
                  {/* <MapPopUp style={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderBottomColor: Colours.primary, borderBottomWidth: 20 }}> */}
                     <AppText txt={food_bank.program_name} size={"18px"} family={"Rubik_600SemiBold"}></AppText>
                     <Padding><Text><BoldText>Location: </BoldText><AppText txt={food_bank.location_address} size={"14px"}> </AppText></Text></Padding>
                     {food_bank.organization_name && <Padding><Text><BoldText>Organization Name:</BoldText><AppText txt={food_bank.organization_name} size={"14px"}> </AppText></Text></Padding>}
                     {food_bank.signup_email && <Padding><Text><BoldText>Email: </BoldText><AppText txt={food_bank.signup_email} size={"14px"}> </AppText></Text></Padding>}
                     {food_bank.description && <Padding><Text><BoldText>Description: </BoldText><AppText txt={food_bank.description.length < 200 ? food_bank.description : food_bank.description.substring(0, 200) + "..."} size={"14px"}> </AppText></Text></Padding>}
                     <GetDirectionsView>
                        <Padding>
                           <Button txt="Get Directions" width={Dimensions.get('window').width * .35} height={"45px"} />
                        </Padding>
                     </GetDirectionsView>
                  </MapPopUp>
               </MapCallOut>
            </Marker>
         }
      })
      }
   </View>
   )
}