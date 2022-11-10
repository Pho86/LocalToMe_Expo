import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Popup } from 'react-native-maps';
import styled from 'styled-components/native';


export default function MapScreen({ navigation }) {
   return (
      <View style={styles.container}>
         <MapView
            initialRegion={{
               latitude: 49.256280,
               longitude: -123.075594,
               latitudeDelta: 0.4,
               longitudeDelta: 0.4,
            }}
            showsUserLocation
            style={styles.map}
         />
         <Marker
            coordinate={{
               latitude: 49.256280,
               longitude: -123.075594,
            }}
            title={"XXXX"}
            description={"XXXXXXXXX"}
            image={require('../assets/Food_Bank_Pin.png')}
         >
         </Marker>
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   },
});