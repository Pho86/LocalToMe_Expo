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
width:${Dimensions.get('window').width * .95}px;
`

export default function Home({ navigation }) {

   const [Toasty, ShowToasty] = useState(true);

   return (
      <View>
         <Container jC={"space-evenly"}>
            <Animatable.View animation="pulse" easing="ease-in-out">
               <ChouImage source={require('../assets/Chou/Chou_Pin.png')} ></ChouImage>
            </Animatable.View>
            <TextFlexBox>
               <Animatable.View animation="fadeIn" easing="ease-in-out">
                  <AppText txt="Find Food Resources Near You" align={"center"} family={"Rubik_700Bold"} size={"22px"} padding={"5px 0px"}></AppText>
                  <AppText txt="From the comfort of your phone, you can find thousands of available food assistance near you." align={"center"} size={"16px"} family={"Rubik_400Regular"}></AppText>
               </Animatable.View>
            </TextFlexBox>
            {/* <Animatable.View animation="bounceIn" easing="ease-in-out" > */}
               <Button txt='Get Started' onButtonPress={() => navigation.navigate("Map")}> </Button>
            {/* </Animatable.View> */}


         </Container>
      </View>
   )
}