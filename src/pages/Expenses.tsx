import React, { useState, useMemo } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ToastAndroid, } from 'react-native';
import { px } from "../styles";
type PaymentInfoContainerProps = {
    title: string
    date: string;
    type: "food" | "personal" | "online" | "entertainment",
    time: string;
    price: number
}
const PaymentInfoContainer = (p: PaymentInfoContainerProps) => {
    const colors: {
        [P in PaymentInfoContainerProps["type"]]: string
    } = {
        entertainment: "red",
        food: "green",
        online: "blue",
        personal: "purple"
    }
    return <View style={{
        backgroundColor: "white",
        padding: px(5),
        margin: px(5),
    }}>
        <View style={{
            backgroundColor: colors[p.type],
            padding: px(5),
            display: "flex",
            alignItems: "center"
        }}>

            <Text style={{
                // alignItems: "center",
                fontWeight: "bold",
                fontSize: px(24)
            }}>
                {p.title}
            </Text>
        </View>
        <View style={{
            display: "flex",
            flexDirection: "row"
        }}>
            <View style={{
                flex: 1
            }}>
                <Text>
                    Date {p.date}
                </Text>
                <Text>
                    Time: {p.time}
                </Text>
            </View>
            <View style={{
                alignItems: "flex-end"
            }}>
                <Text>
                    {p.price} Lei
                </Text>
                <Text>
                    {p.type}
                </Text>
            </View>
        </View>
    </View>
}
export const Expenses = (p: {
    a: string;
}) => {
    return <View style={{
        padding: px(10),
        backgroundColor: "#FAFAFA",
        flex: 1
    }}>
        <PaymentInfoContainer title="Shaorma" price={420.55} type="food" date="2020.01.02" time={"20:00"} />
        <PaymentInfoContainer title="Shaorma" price={420.55} type="entertainment" date="2020.01.02" time={"20:00"} />
        <PaymentInfoContainer title="Shaorma" price={420.55} type="food" date="2020.01.02" time={"20:00"} />
        <PaymentInfoContainer title="Shaorma" price={420.55} type="food" date="2020.01.02" time={"20:00"} />
        <PaymentInfoContainer title="Placa Video" price={3000} type="online" date="2020.01.02" time={"20:00"} />
        <PaymentInfoContainer title="Dentist" price={12000} type="personal" date="2020.01.02" time={"20:00"} />
        <PaymentInfoContainer title="Shaorma" price={420.55} type="food" date="2020.01.02" time={"20:00"} />
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
