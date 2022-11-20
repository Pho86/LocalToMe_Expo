import styled from "styled-components/native";
import { Text, View } from "react-native";
import {
   useFonts,
   Rubik_300Light,
   Rubik_400Regular,
   Rubik_500Medium,
   Rubik_600SemiBold,
   Rubik_700Bold,
   Rubik_800ExtraBold,
   Rubik_900Black,
   Rubik_300Light_Italic,
   Rubik_400Regular_Italic,
   Rubik_500Medium_Italic,
   Rubik_600SemiBold_Italic,
   Rubik_700Bold_Italic,
   Rubik_800ExtraBold_Italic,
   Rubik_900Black_Italic,
} from '@expo-google-fonts/rubik';

const MyText = styled(Text)`
   color: ${(props) => props.color || "#272727"};
   font-size: ${(props) => props.size || "16px"};
   padding: ${(props) => props.padding || "0px 0px 0px 0px"};
   font-weight: ${(props) => props.weight || "400"};
   text-align: ${(props)=> props.align || "left"};

   `

   export default function AppText({
      txt = "Default Text",
      color = "#272727",
      size = "16px",
      family = 'Rubik_700Bold',
      weight = "400",
      align = "left"
}) {
   let [fontsLoaded] = useFonts({
      Rubik_300Light,
      Rubik_400Regular,
      Rubik_500Medium,
      Rubik_600SemiBold,
      Rubik_700Bold,
      Rubik_800ExtraBold,
      Rubik_900Black,
      Rubik_300Light_Italic,
      Rubik_400Regular_Italic,
      Rubik_500Medium_Italic,
      Rubik_600SemiBold_Italic,
      Rubik_700Bold_Italic,
      Rubik_800ExtraBold_Italic,
      Rubik_900Black_Italic,
    });
   return (
      <View>
         <MyText
            color={color}
            size={size}
            weight={weight}
            family={family}
            align={align}
         >{txt}</MyText>
      </View>
   )
}