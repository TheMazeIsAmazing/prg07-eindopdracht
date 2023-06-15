import { StatusBar } from 'expo-status-bar';
import {Button, Pressable, StyleSheet, Text, View, Image, TextComponent, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {mcDonaldsLocations} from './TemporaryJsonMcDonalds'
import {styles} from "./components/Styles";

import * as Location from 'expo-location';
import {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{title: 'Find the cheapest Big Mac near you!'}}
                />
                <Stack.Screen name="Map" component={MapScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Item({ item }) {
    if (item.priceBigMac < 405) {
        return (
            <View style={styles.itemPriceCategoryOne}>
                <Text>{item.name}</Text>
            </View>
        );
    } else if (item.priceBigMac < 445) {
        return (
            <View style={styles.itemPriceCategoryTwo}>
                <Text>{item.name}</Text>
            </View>
        );
    } else if (item.priceBigMac < 485) {
        return (
            <View style={styles.itemPriceCategoryThree}>
                <Text>{item.name}</Text>
            </View>
        );
    } else if (item.priceBigMac < 525) {
        return (
            <View style={styles.itemPriceCategoryFour}>
                <Text>{item.name}</Text>
            </View>
        );
    } else if (item.priceBigMac < 575) {
        return (
            <View style={styles.itemPriceCategoryFive}>
                <Text>{item.name}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.itemPriceCategorySix}>
                <Text>{item.name}</Text>
            </View>
        );
    }

}

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
                <View style={styles.contentContainer}>
                <FlatList
                    style={styles.flatList}
                    data={mcDonaldsLocations}
                    renderItem={({item}) => <Item item={item} />}
                    keyExtractor={item => item.id}
                />
                </View>
            <NavBar navigation={navigation} currentPage="Home"/>
        </View>
    );
};

const MapScreen = ({currentRestaurant}) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    let markerLocation

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    if (location) {
        markerLocation = { longitude: location.coords.longitude, latitude: location.coords.latitude, image: require('./assets/markers/mylocation.png')};
    } else {
        markerLocation = undefined
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: 51.9175,
                    longitude: 4.4796,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.1821,
                }}
            >
                {mcDonaldsLocations.map((marker, i) => {
                    let imageSource;
                    let price = `€ ${marker.priceBigMac / 100}`
                    if (marker.priceBigMac < 405) {
                        imageSource = require('./assets/markers/cat1.png');
                    } else if (marker.priceBigMac < 445) {
                        imageSource = require('./assets/markers/cat2.png');
                    } else if (marker.priceBigMac < 485) {
                        imageSource = require('./assets/markers/cat3.png');
                    } else if (marker.priceBigMac < 525) {
                        imageSource = require('./assets/markers/cat4.png');
                    } else if (marker.priceBigMac < 575) {
                        imageSource = require('./assets/markers/cat5.png');
                    } else {
                        imageSource = require('./assets/markers/cat6.png');
                    }

                    return (
                        <Marker
                            key={i}
                            coordinate={{ longitude: marker.longitude, latitude: marker.latitude }}
                            title={marker.name}
                            description={`Een BigMac is hier: ${price}`}
                        >
                            <Image source={imageSource} style={{ height: 32, width: 21 }} />
                        </Marker>
                    );
                })}
                {markerLocation && (
                    <Marker
                        coordinate={{ longitude: markerLocation.longitude, latitude: markerLocation.latitude }}
                        title="Your Location"
                        description="This is your current location"
                    >
                        <Image source={markerLocation.image} style={{ height: 32, width: 32 }} />
                    </Marker>

                )}
            </MapView>
        </View>
    );
};

const NavBar = ({navigation, currentPage}) => {
    return (
        <View style={styles.navbar}>
            <Pressable
                style={currentPage === 'Home' ? styles.navbarButtonActive : styles.navbarButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.navbarButtonText}>Home</Text>
            </Pressable>
            <Pressable
                style={currentPage === 'Map' ? styles.navbarButtonActive : styles.navbarButton}
                onPress={() => navigation.navigate('Map')}
            >
                <Text style={styles.navbarButtonText}>Map</Text>
            </Pressable>
            <Pressable
                style={currentPage === 'Settings' ? styles.navbarButtonActive : styles.navbarButton}
                onPress={() => navigation.navigate('Settings', { name: 'Jane' })}
            >
                <Text style={styles.navbarButtonText}>Settings</Text>
            </Pressable>
        </View>

    );
}

const SettingsScreen = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text>This is {route.params.name}'s Epic Settings page!!!!!!</Text>
            </View>
            <NavBar navigation={navigation} currentPage="Settings"/>
        </View>);
};

