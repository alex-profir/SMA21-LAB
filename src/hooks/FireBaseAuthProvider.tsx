import { createNavigationContainerRef } from "@react-navigation/native";
import firebase from "firebase";
import React, { FC, useEffect, useState } from "react"
import { navigate, navigationRef } from "../../App";
import { useNavigation } from "../routes";

const useStoreUser = () => {
    const [user, setUser] = useState<firebase.User | null>(null!);
    firebase.auth().onAuthStateChanged(async (user) => {
        console.log({ user });
        // logged in
        if (user) {

        }
        // logged out
        else {

        }
        setUser(user);
    });
    return user;
}
type CustomFC<T = {}> = (p: {
    children?:
    | ((user: firebase.User | null) => React.ReactNode)
    | React.ReactNode;
} & T) => JSX.Element
export const isFunction = (obj: any): obj is Function =>
    typeof obj === 'function';
export const FirebaseAuthProvider: CustomFC = ({ children }) => {
    const user = useStoreUser();
    return <>
        {isFunction(children) ? children(user) : children}
    </>
}