import styled from "styled-components/native";
import { Text, View, Button, TouchableOpacity, Image, Dimensions } from "react-native";
import { Colours } from "../../styles";
import AppText from "../AppText";


const ToastContainer = styled(View)`
display:flex;
flex-direction:row;
background:#F9FFF6;
padding:0px 25px 0px 10px;
border: ${props => props.border || "1px solid #108928"};
borderRadius:15px;
justify-content:flex-start;
align-items:center;
width:${Dimensions.get('window').width * .80}px;
height:60px;
position:absolute;
zIndex:100;
`
const ChouImage = styled(Image)`
width:55px;
height:55px;
display:flex;
align-self:flex-end;
`
const ToastView = styled(View)`
padding-left:20px;
`
const ToastText = styled(AppText)`
`

export const Chou = {
   Happy: require('../../assets/Chou/Chou_Happy.png'),
   Sad: require('../../assets/Chou/Chou_Sad.png'),
   Surprised: require('../../assets/Chou/Chou_Surprised.png'),
   Smug: require('../../assets/Chou/Chou_Smug.png'),
}

export default function Toast({
   txt = "Your pins are loading...",
   onToastPress = () => { },
   color = "#108928",
   border = color,
   source = Chou.Happy
}) {

   return (
      <ToastContainer border={border}>
         <ChouImage source={source} />
         <ToastView>
            <ToastText txt={txt} color={color} family={"Rubik_400Regular"}></ToastText>
         </ToastView>
      </ToastContainer>
   )
}
