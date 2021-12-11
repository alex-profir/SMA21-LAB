// const db = firebase.database();
import firebase from "firebase";
import React, { createContext, FC } from "react";
import { useOfflinePersistance } from "./useOfflincePersistance";

export const firebaseDBContext = createContext<firebase.database.Database>(null as any);
export const FirebaseContextProvider: FC = ({ children }) => {

    const { db } = useOfflinePersistance();
    return <firebaseDBContext.Provider value={db}>
        {children}
    </firebaseDBContext.Provider>
}