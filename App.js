import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, FlatList,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './src/HomeScreen';
import WoodeffectScreen from './src/WoodeffectScreen';
import PorcelainScreen from './src/PorcelainScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialTopTabNavigator();

const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' />
      <NavigationContainer>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", backgroundColor: "#000" }}>
          <FontAwesome5 name={'filter'} size={22} style={{ marginRight: 15, marginVertical: 5 }} color='#fff' />
          <FontAwesome5 name={'search'} size={22} style={{ marginRight: 15, marginVertical: 5 }} color='#fff' />
        </View>
        <Tab.Navigator initialRouteName='Ceramic'
          screenOptions={{ tabBarStyle: { backgroundColor: "#000", }, tabBarLabelStyle: { color: "#fff" }, }}>
          <Tab.Screen name="Ceramic" component={HomeScreen} />
          <Tab.Screen name="Porcelain" component={PorcelainScreen} />
          <Tab.Screen name="Woodeffect" component={WoodeffectScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default App;
