import React, { Component } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View, ScrollView
} from 'react-native';


class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            getResult: null,
            subCategories: null
        }
    }

    async componentDidMount() {
        await fetch('http://esptiles.imperoserver.in/api/API/Product/DashBoard', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CategoryId: 56,
                DeviceManufacturer: 'Google',
                DeviceModel: 'Android SDK built for x86',
                DeviceToken: '',
                PageIndex: 1,
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes.Result); this.setState({ getResult: parsedRes.Result });

                const subCatList = this.state.getResult && this.state.getResult.Category.map(item => item.SubCategories);

                if (subCatList != undefined && subCatList != null) {
                    console.log("subCatList=====", subCatList[0]);
                    this.setState({ subCategories: subCatList[0] });
                }
            })
            .catch(err => console.log(err))
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.subCategories}
                    renderItem={({ item }) => {
                        return <View style={{ marginVertical: 20 }}>

                            <Text style={styles.subCategory}>{item.Name}</Text>
                            <View style={{ flexDirection: "row" }}>
                                {item.Product.map(val =>
                                    <View style={styles.productContainer}>
                                        <View style={styles.productView}>
                                            <View style={styles.textView}>
                                                <Text style={styles.txt}>{val.PriceCode}</Text>
                                            </View>

                                        </View>
                                        <Text style={styles.productName}>{val.Name}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    }}
                    keyExtractor={(item, index) => index.toString()}

                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subCategory: {
        marginLeft: 10,
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "black",
        margin: 10,
        marginTop: 20
    },
    productContainer: {
        width: 120, height: 100,
    },
    productView: {
        backgroundColor: "#a9a9a9",
        width: 100, height: 90,
        borderRadius: 10, marginLeft: 10
    },
    textView: {
        backgroundColor: "#1e90ff",
        width: 50, height: 20,
        marginLeft: 10,
        borderRadius: 5,
        margin: 5
    },
    txt: {
        fontWeight: "bold", color: "#fff", textAlign: "center"
    },
    productName: {
        width: 100, height: 50, marginBottom: 10,
        margin: 10,
        color: "grey"
    }
});

export default HomeScreen;
