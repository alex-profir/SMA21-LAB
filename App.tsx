import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ToastAndroid, } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
function validURL(str: string) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}
export default function App() {
  const [userString, setUserString] = useState("")
  return (
    <View style={styles.container}>
      <Button title="Populate input" onPress={() => {
        setUserString("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      }} />
      <TextInput
        value={userString}
        placeholder="Enter your name"
        onChangeText={setUserString}
        style={styles.textInput}
      />
      <View style={styles.buttonGroup}>
        <Button title="Share" onPress={async () => {
          try {
            const result = await IntentLauncher.startActivityAsync("android.intent.action.SEND", {
              extra: {
                "android.intent.extra.TEXT": userString,
              },
              type: "text/plain",
            })

            if (result.resultCode === IntentLauncher.ResultCode.Success) {
              ToastAndroid.show("Success", 30);
              console.log("success");
            }
          } catch (e) {
            console.log({ e });
          }
        }} />
        <Button title="Search online" onPress={async () => {
          try {
            if (!validURL(userString)) {
              ToastAndroid.showWithGravity("Invalid URL", 30, ToastAndroid.BOTTOM);
              throw {};
            }
            const result = await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
              data: userString
            })
            if (result.resultCode === IntentLauncher.ResultCode.Success) {
              console.log("success");
            }
          } catch (e) {
            console.log({ e });
          }
        }} />
      </View>
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
