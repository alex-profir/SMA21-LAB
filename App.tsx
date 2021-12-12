import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, ToastAndroid, } from 'react-native';
import * as Battery from 'expo-battery';
import * as IntentLauncher from 'expo-intent-launcher';
import { useEffectAsync } from './src/hooks/useEffectAsync';
import { Icon, Header, Input, Button } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase/app';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import 'firebase/firestore';
import 'firebase/database'
import { px } from './src/styles';
import { Wallet } from './src/pages/Wallet';
import { Expenses } from './src/pages/Expenses';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddExpense } from './src/pages/AddExpense';
import { useNetInfo } from '@react-native-community/netinfo';
import { FirebaseContextProvider } from './src/hooks/FirebaseContextProvider';
import Login from './src/pages/Login';
import { FirebaseAuthProvider } from './src/hooks/FireBaseAuthProvider';

const firebaseConfig = {
  apiKey: "AIzaSyDfC6OMVmK_mmaY5quhrm6EuuOAGDwULvc",
  authDomain: "sma-lab-28d1b.firebaseapp.com",
  databaseURL: "https://sma-lab-28d1b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sma-lab-28d1b",
  storageBucket: "sma-lab-28d1b.appspot.com",
  messagingSenderId: "316558270653",
  appId: "1:316558270653:web:d9a2eda31f2bd3eb6f57d4",
  measurementId: "G-4Z7JM6QZDQ"
};
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

const Logout = () => {
  return <View>
    <Button title="Logout" onPress={() => {
      console.log("logout");
      firebase.auth().signOut();
    }}>
    </Button>
  </View>
}
const Tab = createBottomTabNavigator();
const DashboardScreens = () => <Tab.Navigator screenOptions={{
  headerRight: Logout
}}>
  <Tab.Screen name="Wallet" component={Wallet} options={{
    // icon
  }} />
  <Tab.Screen name="Expenses" options={{
    headerShown: false,
  }} component={ExpensesScreens} />
</Tab.Navigator>


export const navigationRef = createNavigationContainerRef<any>()
export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export default function App() {


  return (
    <SafeAreaProvider>
      <FirebaseContextProvider>

        <View style={{
          height: "100%",
        }}>
          <NavigationContainer ref={navigationRef}>
            <FirebaseAuthProvider>
              {(user) => {
                return <Stack.Navigator screenOptions={{
                  headerShown: false
                }}>
                  {user ?
                    <Stack.Screen name='dashboard' component={DashboardScreens} /> : <Stack.Screen name='Login' component={Login} />}

                </Stack.Navigator>
              }}
            </FirebaseAuthProvider>
          </NavigationContainer>
        </View>
      </FirebaseContextProvider>

      <StatusBar style="auto" />
    </SafeAreaProvider >
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
