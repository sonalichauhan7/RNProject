import React, { Component } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text, Image,
    View, ScrollView
} from 'react-native';
import ProductList from '../component/ProductList';


class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            getResult: null,
            subCategories: null,
            refreshing: false,
            productList: [],
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

    refreshData = async () => {
        this.setState({ refreshing: true })
        await fetch('http://esptiles.imperoserver.in/api/API/Product/DashBoard', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CategoryId: 56,
                PageIndex: 2,
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("from refreshData======", parsedRes.Result.Category[0].SubCategories);
                const result = parsedRes.Result.Category[0].SubCategories;
                this.setState({ subCategories: this.state.subCategories.concat(result), refreshing: false })
            })
            .catch(err => console.log(err))
    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.subCategories}
                    renderItem={({ item }) => {
                        return <View style={{ marginBottom: 20 }}>

                            <Text style={styles.subCategory}>{item.Name}</Text>
                            <View style={{}}>
                                <ProductList products={item.Product} />
                            </View>
                        </View>
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refreshData}
                        />
                    }
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
    },
    productContainer: {
        width: 120, height: "auto",
    },
    productView: {
        width: 100, height: 90,
        borderRadius: 10, marginLeft: 10
    },
    textView: {
        backgroundColor: "#1e90ff",
        width: 50, height: 20,
        marginLeft: 10,
        borderRadius: 5,
        margin: 5,
        position: "absolute",
        left: 5
    },
    txt: {
        fontWeight: "bold", color: "#fff", textAlign: "center"
    },
    productName: {
        marginLeft: 15,
    }
});

export default HomeScreen;
