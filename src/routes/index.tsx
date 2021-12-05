import React from "react";
import { NavigationProp, useNavigation as RNUserNavigation } from "@react-navigation/native";
import { Wallet } from "../pages/Wallet";
import { Expenses } from "../pages/Expenses";

const r = {
    home: {
        component: Wallet
    },
    expenses: {
        component: Expenses
    }
}
type RouteType = {
    [name: string]: {
        component: React.FunctionComponent<any>// | React.ComponentClass<any>
    }
}
type RouteTypes<T extends RouteType> = {
    [P in keyof T]: Parameters<T[P]["component"]>[0] extends undefined ? any : Parameters<T[P]["component"]>[0]
}
type Routes = RouteTypes<typeof r>
export const useNavigation = () => RNUserNavigation<NavigationProp<ReactNavigation.RootParamList & Routes>>();

