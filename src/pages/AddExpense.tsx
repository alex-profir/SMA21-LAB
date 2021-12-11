import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import { Text, View } from "react-native"
import { Button, Input } from "react-native-elements";
import { px } from "../styles";
import { Picker } from "@react-native-picker/picker";
import { useEffectAsync } from "../hooks/useEffectAsync";
import { useOfflinePersistance } from "../hooks/useOfflincePersistance";
import { firebaseDBContext } from "../hooks/FirebaseContextProvider";

export const AddExpense = () => {
    const nav = useNavigation()
    const db = useContext(firebaseDBContext);
    const [categories, setCategories] = useState([]);
    const [info, setInfo] = useState({
        description: "",
        price: 0,
        category: "",
        date: new Date().toISOString(),
    });
    useEffectAsync(() => {
        const ref = db.ref("categories");
        
        ref.on("value", async (val) => {
            const value = val.val()
            setCategories(value);
        });
    });
    function updateValues() {
        const ref = db.ref("history");
        // ref.set(["food", "entertainment", "online", "personal"]);
        ref.push(info)
        // ref.push()
    }
    return <View style={{
        padding: px(10)
    }}>
        <View style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent:"center"
        }}>
            <Input
                label="Description"
                // disabled
                // keyboardType="numeric"
                onChangeText={description => {
                    setInfo({
                        ...info,
                        description
                    });

                }}

                // value={p.value ?? ""}
                containerStyle={{
                    flex: 1,
                }}
            />
            <Input
                label="Price"
                // disabled
                keyboardType="numeric"
                onChangeText={price => {
                    setInfo({
                        ...info,
                        price: +price
                    })
                    // p.onChangeText(text);
                }}

                // value={p.value ?? ""}
                containerStyle={{
                    flex: 1,
                }}
            />
        </View>
        <View style={{
            marginTop: px(10),
            marginBottom: px(10)
        }}>
            <Picker
                // selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) => {
                    setInfo({
                        ...info,
                        category: itemValue as any
                    });
                    // setSelectedLanguage(itemValue)
                }}>
                {categories.map(category => {
                    return <Picker.Item key={category} label={category} value={category} />
                })}
            </Picker>
        </View>
        <View>
            <Text>
                Time of payment: {new Date().toLocaleString()}
            </Text>
            <View style={{
                display: "flex",
                flexDirection: "row",
                // flexGrow: 1,
            }}>
                <View style={{
                    flex: 1,
                    // width: "50%",
                    margin: px(10),
                }}>
                    <Button title="Save" onPress={() => {
                        // console.log({ info });
                        updateValues();
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    // width: "50%",
                    margin: px(10),
                }}>
                    <Button title="Reset" />
                </View>

            </View>
        </View>
    </View>;
}