import styled from "styled-components/native";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { Colours } from "../../styles";
import AppText from "../AppText";
import { Dimensions } from 'react-native';


const ButtonCont = styled(TouchableOpacity)`
backgroundColor:${Colours.primary};
padding:5px;
width:${props => props.width || Dimensions.get('window').width * .80}px;
height:${props => props.height || "60px"};
border-radius:12px;
display:flex;
justify-content:center;
align-items:center;

`

export default function RegButton({
   txt = "Continue",
   onButtonPress = () => { },
   width = Dimensions.get('window').width * .80,
   height= "60px",
}) {

   return (
      <View >
         <ButtonCont onPress={onButtonPress} width={width} height={height}>
            <AppText color={Colours.background} txt={txt} size={"16px"} family={"Rubik_400Regular"}></AppText>
         </ButtonCont>
      </View>
   )
}
