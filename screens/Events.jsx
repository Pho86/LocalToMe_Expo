import { View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import AppText from '../components/AppText';
import Button from '../components/Button';
import { FlexBox, Container } from '../styles';
import Toast from '../components/Toast';
import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useState, useEffect } from 'react';
import { getAllNews } from "../server/database";
import { getEvents } from "../server/database";


const EventView = styled(View)`
width:80%;
padding-bottom:15px;
`

export default function Events({ navigation }) {
   const [events, setEvents] = useState([])
   const parseNewsandEvents = async () => {
      const eventData = await getEvents();
      const eventList = JSON.parse(JSON.stringify(eventData));
      setEvents(eventList)
      console.log(eventList)
   }
   useEffect(() => {
      parseNewsandEvents();
   }, []);


   return (
      <ScrollView>
         <Container >

            {events.map(event => {
               return <EventView key={event.id} >
                  <Text>{event.eventName}</Text>
                  <Image source={{ uri: event.eventImage }} style={{ width: 300, height: 150 }}></Image>
                  <Text>{event.eventContent}</Text>
                  {/* <Text>{new Date(event.eventDate.seconds * 1000).toLocaleString(
                  "default",
                  { month: "short" }
                  )}{" "}
                  <br />
                  {String(
                     new Date(event.eventDate.seconds * 1000).getDate()
                  ).padStart(2, "0")}</Text> */}
               </EventView>
            })}

         </Container>
      </ScrollView>
   )
}