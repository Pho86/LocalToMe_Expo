import { View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import AppText from '../components/AppText';
import Button from '../components/Button';
import { FlexBox, Container } from '../styles';
import Toast from '../components/Toast';
import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useState, useEffect } from 'react';
import { getNews } from "../server/database";
import { getEvents } from "../server/database";
import { getAllNews } from '../server/database';

const EventView = styled(View)`
width:80%;
padding-bottom:15px;
`
// UNUSED PAGE
export default function News({ navigation }) {
   const [news, setNews] = useState([])

   const parseNewsandEvents = async () => {
      const newsData = await getAllNews();
      const newsList = JSON.parse(JSON.stringify(newsData))
      setNews(newsList)
      console.log(newsList)
   }

   useEffect(() => {
      parseNewsandEvents();
   }, []);


   return (
      <ScrollView>
         <Container >

            {news.map(newsItem => {
               return <EventView key={newsItem.id} >
                  <Text>{newsItem.name}</Text>
                  <Image source={{ uri: newsItem.newsImage }} style={{ width: 300, height: 150 }}></Image>
                  <Text>{newsItem.newsTitle}</Text>
                  <Text>{newsItem.newsContent}</Text>
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