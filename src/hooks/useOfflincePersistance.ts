import { useNetInfo } from "@react-native-community/netinfo";
import firebase from "firebase";
import { useEffect, useState } from "react";
import { useEffectAsync } from "./useEffectAsync";

export const useOfflinePersistance = () => {
    const netInfo = useNetInfo();
    const db = firebase.database();
    const [online, setOnline] = useState(false);
    // check initial states;
    useEffect(() => {
        setOnline(netInfo.isConnected ?? false);
    }, []);
    useEffectAsync(() => {
        if (netInfo.isConnected && !online) {
            db.goOnline();
            setOnline(true);
        } else {
            db.goOffline();
            setOnline(false);
        }
    }, [netInfo]);

    return {
        db
    };
}