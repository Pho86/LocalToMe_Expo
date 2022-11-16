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
width:${Dimensions.get('window').width * .90}px;
height:${Dimensions.get('window').height * .50}px;
// height:50%;
`
const TextFlexBox = styled(FlexBox)`
textAlign:center;
width:95%;
`

export default function Home({ navigation }) {

   const [Toasty, ShowToasty] = useState(true);

   return (
      <View>
         <Container jC={"space-evenly"}>
            <ChouImage source={require('../assets/Chou/Chou_Pin.png')} ></ChouImage>
            <TextFlexBox>
               <AppText txt="Find Food Resources Near You" size={"24px"} weight={"800"} align={"center"}></AppText>
               <AppText txt="From the comfort of your phone, you can find thousands of available food assistance near you." align={"center"}></AppText>
            </TextFlexBox>
            <Button txt='Get Started' onButtonPress={() => navigation.navigate("Map")}> </Button>


         </Container>
      </View>
   )
}