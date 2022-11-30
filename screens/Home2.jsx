import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import AppText from '../components/AppText';
import Button from '../components/Button';
import { FlexBox, Container } from '../styles';
import Toast from '../components/Toast';
import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useState, useEffect } from 'react';

const ChouImage = styled(Image)`
width:95%;
height:50%;
`
const TextFlexBox = styled(FlexBox)`
textAlign:center;
width:95%;
`
// UNUSED PAGE
export default function Home2({ navigation }) {

   const [Toasty, ShowToasty] = useState(true);

   return (
      <View>
         <Container jC={"space-evenly"}>
            <ChouImage source={require('../assets/Chou/Chou_News.png')} ></ChouImage>
            <TextFlexBox>
               <AppText txt="Keep Track of Food Banks’ News" size={"24px"} weight={"800"} align={"center"}></AppText>
               <AppText txt="Be updated on News & Resources from different Food Banks and stay informed." align={"center"}></AppText>
            </TextFlexBox>
            <Button txt='Get Started' onButtonPress={() => navigation.navigate("Map")}> </Button>


         </Container>
      </View>
   )
}