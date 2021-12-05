import React, { useState, useMemo } from "react";
import { StyleSheet, View, Image, TextInput, Alert, ActivityIndicator, ScrollView, } from 'react-native';
import { useEffectAsync } from '../hooks/useEffectAsync';
import firebase from 'firebase/app';
import { Input, Text, Button, ListItem, useTheme } from "react-native-elements";
import { px } from "../styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearProgress } from 'react-native-elements';
import { NavigationProp, useNavigation } from "@react-navigation/native";


const InputGroup = (p: {
    headerText: string;
    value: string;
    onChangeText: (text: string) => void
}) => {
    return <View style={{
        width: "50%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // justifyContent:"center"
    }}>
        <Text style={{
        }}>{p.headerText}</Text>
        <Input
            // disabled
            keyboardType="numeric"
            onChangeText={text => {
                p.onChangeText(text);
            }}
            value={p.value ?? ""}
            containerStyle={{
                flex: 1,
            }}
        />
    </View>
}
const toUpperCase = (word: string) => `${word[0].toUpperCase()}${word.slice(1)}`
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const Wallet = () => {
    const db = firebase.database();
    const theme = useTheme();
    const nav = useNavigation<NavigationProp<ReactNavigation.RootParamList & {
        Expenses: any;
    }>>()
    const [selectedMonth, setSelectedMonth] = useState("");
    const [changeValues, setChangeValues] = useState<{
        income: string;
        expenses: string;
    }>({
        expenses: "",
        income: ""
    });
    const [calendar, setCalendar] = useState<Record<string, {
        expenses: number;
        income: number
    }>>({});
    useEffectAsync(async () => {
        const month = await AsyncStorage.getItem("@selected_month");
        if (month !== null) {
            setSelectedMonth(month);
        } else {
            setSelectedMonth("january");
        }
    }, []);
    const disabledButton = useMemo(() => {

        if (!calendar) {
            return true;
        }
        const realValues = {
            income: selectedMonth in calendar ? calendar[selectedMonth].income.toString() : "",
            expenses: selectedMonth in calendar ? calendar[selectedMonth].expenses.toString() : ""
        }
        if (realValues.income === "" || realValues.expenses === "") {
            return true;
        }
        return changeValues.expenses === realValues.expenses && changeValues.income === realValues.income
    }, [selectedMonth, changeValues, calendar]);
    useEffectAsync(async () => {

        await AsyncStorage.setItem("@selected_month", selectedMonth);
    }, [selectedMonth]);
    useEffectAsync(async () => {
        setChangeValues({
            income: selectedMonth in calendar ? calendar[selectedMonth].income.toString() : "",
            expenses: selectedMonth in calendar ? calendar[selectedMonth].expenses.toString() : ""
        })
    }, [selectedMonth, calendar]);
    const [monts, setMonts] = useState<string[]>([]);
    const loading = useMemo(() => {
        return monts.length === 0 || Object.keys(calendar).length === 0;
    }, [monts, calendar]);
    function setValues() {
        const ref = db.ref("calendar")
        ref.set({
            january: {
                expenses: 1,
                income: 2
            },
            february: {
                expenses: 3,
                income: 4
            },
            march: {
                expenses: 5,
                income: 6
            },
            april: {
                expenses: 7,
                income: 8
            },
            may: {
                expenses: 9,
                income: 10
            },
            june: {
                expenses: 11,
                income: 12
            },
            july: {
                expenses: 13,
                income: 14
            },
            august: {
                expenses: 15,
                income: 16
            },
            september: {
                expenses: 17,
                income: 18
            },
            october: {
                expenses: 19,
                income: 20
            },
            november: {
                expenses: 21,
                income: 22
            },
            december: {
                expenses: 23,
                income: 24
            }
        })
    }
    function updateValues() {
        const ref = db.ref("calendar");
        ref.set({
            ...calendar,
            [selectedMonth]: changeValues
        })
    }
    useEffectAsync(async () => {
        const ref = db.ref("calendar");
        ref.on("value", async (val) => {
            const value = val.val()
            await sleep(250);
            setMonts(Object.keys(value));
            setCalendar(value);
            console.log({ val });
        });
        ref.set
    }, [])
    return <View style={{
        padding: px(10)
    }}>
        <View>
            <Text h4>{selectedMonth.length > 1 ? toUpperCase(selectedMonth) : ""}</Text>
        </View>
        <View style={styles.container}>
            <InputGroup value={changeValues.income} headerText="Income"
                onChangeText={(text) => {
                    setChangeValues(val => ({
                        ...val,
                        income: text
                    }))
                }}
            />

            <InputGroup value={changeValues.expenses} headerText="Expenses"
                onChangeText={(text) => {
                    setChangeValues(val => ({
                        ...val,
                        expenses: text
                    }))
                }}
            />
        </View>
        {loading && <View>
            <ActivityIndicator size="large" color={theme.theme.colors?.primary} />
        </View>}
        <Button disabled={disabledButton} title="Update" onPress={() => {
            updateValues();
        }} />
        <ScrollView style={{
            height: "50%",
        }}>
            {monts.map(month => {
                return <ListItem key={month} bottomDivider onPress={() => {
                    console.log(month);
                    setSelectedMonth(month);
                }}>
                    <ListItem.Content>
                        <ListItem.Title>{month}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            })}
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row"
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
