import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

class PorcelainScreen extends Component {
    constructor() {
        super();
        this.state = {
            number: 0,
            row1: "grey",
            row2: "grey",
            row3: "grey",
            row4: "grey",
            row5: "grey",
            itemArr: [
                {
                    color: "red",
                    value: 10
                },
                {
                    color: "blue",
                    value: 110
                },
                {
                    color: "blueviolet",
                    value: 250
                },
                {
                    color: "royalblue",
                    value: 500
                },
                {
                    color: "fuchsia",
                    value: 1000
                }
            ],
            list: [
                { title: "Total Hardness (ppm)" },
                { title: "Total Chlorine (ppm)" },
                { title: "Free Chlorine (ppm)" },
                { title: "pH (ppm)" },
                { title: "Total Alkalinity (ppm)" }
            ]
        }
    }

    onChangeNumber = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignSelf: "flex-end", margin: 20, backgroundColor: "grey", borderRadius: 10, width: 70 }}>
                    <Text style={{ paddingHorizontal: 10, textAlign: "center", fontWeight: "bold" }}>Next</Text>
                </View>
                <Text style={styles.testStrip}>Test Strip</Text>

                <View style={{ flexDirection: "row" }}>
                    <View style={styles.leftContainer}>

                        <View style={{ marginTop: 20 }}>
                            <FlatList
                                data={this.state.list}
                                renderItem={({ item, index }) =>
                                    <View style={[styles.leftItem, {
                                        backgroundColor:
                                            item.title == "Total Hardness (ppm)" ? this.state.row1 :
                                                item.title == "Total Chlorine (ppm)" ? this.state.row2 :
                                                    item.title == "Free Chlorine (ppm)" ? this.state.row3 :
                                                        item.title == "pH (ppm)" ? this.state.row4 :
                                                            item.title == "Total Alkalinity (ppm)" ? this.state.row5 :
                                                                "grey"
                                    }]}></View>
                                }
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>

                    </View>
                    <View style={styles.rightPart}>

                        <FlatList
                            data={this.state.list}
                            renderItem={({ item, index }) =>
                                <View>
                                    <View style={{ flexDirection: "row", margin: 10 }}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <View style={{
                                            backgroundColor: "#fff", position: "absolute", left: 210,
                                            height: 30, width: 80, borderRadius: 10, borderColor: "grey", borderWidth: 1
                                        }}>
                                            <TextInput
                                                style={{ textAlign: "center", color: "black", paddingVertical: 5 }}
                                                onChangeText={this.onChangeNumber}
                                                value={this.state.number[index]}
                                                placeholderTextColor="grey"
                                                placeholder="0"
                                                keyboardType="numeric"
                                            />
                                        </View>
                                    </View>
                                    <FlatList
                                        horizontal={true}
                                        data={this.state.itemArr}
                                        renderItem={({ item: item2, index: idx }) =>
                                            <View style={[styles.itemContainer, { marginLeft: 10 }]}>
                                                <View>
                                                    <TouchableOpacity onPress={() => {

                                                        item.title == "Total Hardness (ppm)" ? this.setState({ row1: item2.color, number: item2.value }) :
                                                            item.title == "Total Chlorine (ppm)" ? this.setState({ row2: item2.color }) :
                                                                item.title == "Free Chlorine (ppm)" ? this.setState({ row3: item2.color }) :
                                                                    item.title == "pH (ppm)" ? this.setState({ row4: item2.color }) :
                                                                        item.title == "Total Alkalinity (ppm)" ? this.setState({ row5: item2.color }) :
                                                                            null
                                                    }

                                                    }>
                                                        <View style={[styles.item, { backgroundColor: item2.color }]}></View>
                                                        <Text style={styles.itemText}>{item2.value}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />


                    </View>

                </View>

            </View>
        );
    }

}

export default PorcelainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    testStrip: { fontWeight: "bold", color: "blue", fontSize: 25, marginLeft: 20, marginVertical: 10 },
    leftContainer: {
        width: 35, height: 600,
        marginLeft: 20,
        borderRadius: 10,
        borderWidth: 1, borderColor: "grey"
    },
    rightPart: {
        width: width - 100, height: 600,
        marginLeft: 10,
    },
    rightContainer: {
        flexDirection: "row", justifyContent: "space-around",
    },
    txtInput: {
        backgroundColor: "#fff",
        height: 30, width: 80, borderRadius: 10, borderColor: "grey", borderWidth: 1
    },
    title: { fontWeight: "bold", color: "grey", marginVertical: 5 },
    itemContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10 },
    leftItem: { width: 34, height: 20, marginVertical: 45 },
    item: { width: 50, height: 20, borderRadius: 5 },
    itemText: { width: 50, textAlign: "center", color: "grey" }
});
