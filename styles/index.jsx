import styled from 'styled-components/native';
import { View } from 'react-native';

export const FlexBox = styled(View)`
   display: flex;
   justify-content: ${props=>props.jC || "center"};
   align-items: center;
   gap:${props => props.gap || "0px"};
   
`
export const Container = styled(View)`
   display: flex;
   justify-content: ${props=>props.jC || "center"};
   align-items: center;
   gap:${props => props.gap || "0px"};
   height:100%;
`
export const Colours = {
   primary: "#108928",
   secondary: "#085617",
   background: "#FFFFFF",
   foreground: "#000000"
 }
 
