import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text, FlatList,
    View, Image, RefreshControl, TouchableOpacity
} from 'react-native';


const ProductList = (props) => {
    const [productList, setProductList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setProductList(props.products)
    }, [])

    const refreshData = async () => {
        setRefreshing(true)
        await fetch('http://esptiles.imperoserver.in/api/API/Product/ProductList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PageIndex: 2,
                SubCategoryId: 71
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("from ProductList refreshData======", parsedRes.Result);
                setProductList([...productList.concat(parsedRes.Result)])
                setRefreshing(false)

            })
            .catch(err => console.log(err))
    }

    const showFooter = () => {
        return (
            <TouchableOpacity onPress={refreshData}>
                <Text style={{ color: "#000" }}>Click here</Text>
            </TouchableOpacity>
        )

    }

    return (
        <FlatList
            horizontal={true}
            data={productList}
            renderItem={({ item, index }) =>
                <View style={styles.productContainer}>
                    <Image
                        style={styles.productView}
                        source={{ uri: item.ImageName }}
                    />
                    <View style={styles.textView}>
                        <Text style={styles.txt}>{item.PriceCode}</Text>
                    </View>
                    <View style={styles.productName}>
                        <Text style={{ color: "#000" }}>{item.Name}</Text>
                    </View>
                </View>
            }
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refreshData}
                />
            }
            // refreshing={refreshing}
            // onRefresh={refreshData}
            onEndReached={refreshData}
            onEndReachedThreshold={0.5}
        // ListFooterComponent={showFooter}
        />
    );
}

const styles = StyleSheet.create({
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

export default ProductList;
