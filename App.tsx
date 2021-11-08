import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ToastAndroid, } from 'react-native';
import * as Battery from 'expo-battery';
import * as IntentLauncher from 'expo-intent-launcher';
import { useEffectAsync } from './src/hooks/useEffectAsync';
import { Icon, Header, Input } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database'
import { px } from './src/styles';
import { Wallet } from './src/pages/Wallet';


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{
        height: "100%",
      }}>
        <Header
          centerComponent={{ text: 'Smart Wallet', style: { color: '#fff', fontWeight: "bold", fontSize: px(24), } }}
        />
        <View style={styles.container}>
          <Wallet />
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: 100,
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
  }
});
