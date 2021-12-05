import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
export default function () {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="asd" component={() => <div></div>} />
            {/* <Stack.Screen name="Home" options={{
                header: () => <Header
                    centerComponent={{ text: 'Smart Wallet', style: { color: '#fff', fontWeight: "bold", fontSize: px(24), } }}
                />
            }} component={Wallet} />
            <Stack.Screen name="Expenses" component={p => <Expenses {...p} />} /> */}
        </Stack.Navigator>
    </NavigationContainer>
}