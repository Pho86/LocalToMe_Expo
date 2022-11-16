import styled from "styled-components/native";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { Colours } from "../styles";
import AppText from "./AppText";
import { Dimensions } from 'react-native';


const ButtonCont = styled(TouchableOpacity)`
backgroundColor:${Colours.primary};
padding:5px;
width:${Dimensions.get('window').width * .80}px;
height:65px;
border-radius:12px;
display:flex;
justify-content:center;
align-items:center;

`

export default function RegButton({
   txt = "Continue",
   onButtonPress = () => { }
}) {

   return (
      <View >
         <ButtonCont onPress={onButtonPress}>
            <AppText color={Colours.background} txt={txt} size={"16px"}></AppText>
         </ButtonCont>
      </View>
   )
}
