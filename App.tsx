import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ToastAndroid, ImageProps, Platform, InteractionManager, NativeSyntheticEvent, ImageErrorEventData, } from 'react-native';
import { WebView } from 'react-native-webview';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Clipboard from 'expo-clipboard';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function registerForPushNotificationsAsync() {
  let token = '';
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

function AsyncImage(p: ImageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<NativeSyntheticEvent<ImageErrorEventData>>(null!);
  return <View>
    <Image
      onLoadStart={() => {
        setLoading(true);
      }}
      onLoadEnd={() => {
        setLoading(false);
      }}
      onError={(e) => {
        console.log("ERROR");
        // console.log(e);
        setError(e);
        setLoading(false);
      }}
      {...p}
    />
    <Text>
      {loading && "Loading ..."}
    </Text>
    <Text>
      {error && "Error loading the image"}
    </Text>
  </View>
}

export default function App() {
  const [copiedText, setCopiedText] = useState('');
  return (
    <View style={styles.container}>
      <View style={{
        marginTop: 50,
        backgroundColor: "blue",
        width: "100%",
        height: "50%"
      }}>
        <WebView
          source={{
            uri: "https://www.google.com/imghp?hl=en",
          }}
        />
      </View>
      <View style={{
        margin: 2,
      }}>
        <Button title="Load Image with background" onPress={async () => {
          // await schedulePushNotification();
          const text = await Clipboard.getStringAsync();
          setCopiedText(text);
        }} />
      </View>
      <View
        style={{
          margin: 2
        }}
      >
        <Button title="Load Image with foreground" onPress={() => {

        }} />
      </View>
      <View
        style={{
          margin: 2
        }}
      >
        <Button title="Set Clipboard" onPress={async () => {
          const text = await Clipboard.getStringAsync();
          setCopiedText(text);
        }} />
      </View>
      <View>
        <Text>
          {copiedText}
        </Text>
      </View>
      <View>
        {copiedText ? <AsyncImage style={{
          width: 100,
          height: 100
        }} source={{ uri: copiedText }} /> : <View />}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',

  },
  btn: {
    margin: 2
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    // alignItems: "center"
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});
