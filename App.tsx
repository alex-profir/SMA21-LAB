import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Dimensions, ToastAndroid, } from 'react-native';
import MapView, { Marker, Polyline, } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffectAsync } from './src/hooks/useEffectAsync';
function returnDelta() {
  // const
}
export default function App() {
  const [region, setRegion] = useState<MapView["props"]["region"]>({
    latitude: 45.7489,
    longitude: 21.2087,
    latitudeDelta: 0.0943,
    longitudeDelta: 0.0934,
  });
  const [userLocation, setUserLocation] = useState<{
    latitude: number,
    longitude: number
  }>(null!);
  useEffectAsync(async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Not granted");
      // setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    })
    console.log({ location })
    // setLocation(location);
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        rotateEnabled={false}
        loadingEnabled={true}
        style={styles.map}
        showsUserLocation={true}
        region={region}
        onRegionChange={(region) => {
          // console.log({ region });
        }}
      >
        <Polyline
          coordinates={[{ latitude: 45.7499, longitude: 21.2287 },
          { latitude: 45.7599, longitude: 21.2387 },
          { latitude: 45.7409, longitude: 21.2487 }]}
          strokeWidth={10}
          strokeColor="#00a8ff"
          lineDashPattern={[1]}
        // lineCap="around"
        />
        <Marker onPress={() =>
          ToastAndroid.show("Pressed on marker", ToastAndroid.SHORT)} coordinate={{ latitude: 45.7499, longitude: 21.2287 }} title="Timisoara" description="Test1" />
        <Marker onPress={() =>
          ToastAndroid.show("Pressed on marker", ToastAndroid.SHORT)} coordinate={{ latitude: 45.7599, longitude: 21.2387 }} title="Timisoara" description="Test2" />
        <Marker onPress={() =>
          ToastAndroid.show("Pressed on marker", ToastAndroid.SHORT)} coordinate={{ latitude: 45.7409, longitude: 21.2487 }} title="Timisoara" description="Test3" />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  btn: {
    margin: 2
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-around",
    width: "100%",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
