import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ToastAndroid, } from 'react-native';
import * as Battery from 'expo-battery';
import * as IntentLauncher from 'expo-intent-launcher';
import { useEffectAsync } from './src/hooks/useEffectAsync';
import { Icon, Header, Input } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import 'firebase/firestore';
import 'firebase/database'
import { px } from './src/styles';
import { Wallet } from './src/pages/Wallet';
import { Expenses } from './src/pages/Expenses';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddExpense } from './src/pages/AddExpense';


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createNativeStackNavigator();

const ExpensesScreens = () => {
  return <Stack.Navigator screenOptions={{
    headerShown: true,
    headerBackVisible: true,
  }}>
    <Stack.Screen name='expenses2' options={{
      headerTitle: "Expenses"
    }} component={Expenses} />
    <Stack.Screen name='expenses1' options={{
      headerTitle: "Add expense"
    }} component={AddExpense} />
  </Stack.Navigator>
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{
        height: "100%",
      }}>
        {/* <Header
          centerComponent={{ text: 'Smart Wallet', style: { color: '#fff', fontWeight: "bold", fontSize: px(24), } }}
        /> */}
        {/* <View style={styles.container}>
        </View> */}
        <NavigationContainer>
          {/* <Stack.Navigator>
            <Stack.Screen name="Home" options={{
              header: () => <Header
                centerComponent={{ text: 'Smart Wallet', style: { color: '#fff', fontWeight: "bold", fontSize: px(24), } }}
              />
            }} component={Wallet} />
            <Stack.Screen name="Expenses" component={p => <Expenses {...p} />} />
          </Stack.Navigator> */}
          <Tab.Navigator screenOptions={{
            // tabBarIcon
            // headerShown: false,
          }}>
            <Tab.Screen name="Wallet" component={Wallet} options={{
              // icon
            }} />
            <Tab.Screen name="Expenses" options={{
              headerShown: false,
            }} component={ExpensesScreens} />
          </Tab.Navigator>
        </NavigationContainer>
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
