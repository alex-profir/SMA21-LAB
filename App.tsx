import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ToastAndroid, } from 'react-native';
import * as Battery from 'expo-battery';
import * as IntentLauncher from 'expo-intent-launcher';
import { useEffectAsync } from './src/hooks/useEffectAsync';
import { Icon } from 'react-native-elements'
const batteryLevelMap = {
  "0.25": "battery-quarter",
  "0.50": "battery-half",
  "0.75": "battery-three-quarters",
  "1": "battery-full"
}
export default function App() {
  const [batteryLevel, setBatteryLevel] = useState<number>(0);

  const [batteryState, setBatteryState] = useState<Battery.BatteryState>(null!);
  const batteryIcon = useMemo(() => {
    if (batteryLevel >= 0 && batteryLevel < 0.25) {
      return "battery-1"
    } else if (batteryLevel >= 0.25 && batteryLevel < 0.5) {
      return "battery-2"
    } else if (batteryLevel >= 0.5 && batteryLevel < 0.75) {
      return "battery-3";
    } else if (batteryLevel >= 0.75) {
      return "battery-4"
    }
    return "battery-full";
  }, [batteryLevel])
  useEffectAsync(async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    const batteryState = await Battery.getBatteryStateAsync();
    setBatteryState(batteryState);
    setBatteryLevel(batteryLevel);
    const batteryStateSubscription = Battery.addBatteryStateListener(({ batteryState }) => {
      setBatteryState(batteryState)

    })
    const batteryLevelSubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel);

    })
    return () => {
      batteryStateSubscription && batteryStateSubscription.remove();
      batteryLevelSubscription && batteryLevelSubscription.remove();
    }
  }, [])
  return (
    <View style={styles.container}>

      <View style={styles.buttonGroup}>
        <Text>
          Battery level:
          {batteryLevel}
        </Text>
        <Text>
          Battery State:
          {batteryState}
        </Text>
      </View>
      <Icon type='font-awesome' tvParallaxProperties name={batteryIcon} color='#00aced' />
      <View>
        <Text>
          {batteryState === Battery.BatteryState.CHARGING && "Charging"}
          {batteryState === Battery.BatteryState.FULL && "Full"}
          {batteryState === Battery.BatteryState.UNPLUGGED && "Unplugged"}
          {batteryState === Battery.BatteryState.UNKNOWN && "Unknown"}
        </Text>
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
