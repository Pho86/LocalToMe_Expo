import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import AppText from '../components/AppText';
import Button from '../components/Button';
import { FlexBox, Container } from '../styles';

const ChouImage = styled(Image)`
width:95%;
height:50%;
`
const TextFlexBox = styled(FlexBox)`
textAlign:center;
width:95%;
`

export default function Home({ navigation }) {
   return (
      <Container jC={"space-evenly"}>
         <ChouImage source={require('../assets/Chou_Pin.png')} ></ChouImage>
         <TextFlexBox>
            <AppText txt="Find Food Resources Near You" size={"24px"} weight={"800"} align={"center"}></AppText>
            <AppText txt="From the comfort of your phone, you can find thousands of available food assistance near you." align={"center"}></AppText>
         </TextFlexBox>
         <Button txt='Go To Map' onButtonPress={() => navigation.navigate("Map")}> </Button>
      </Container>
   )
}