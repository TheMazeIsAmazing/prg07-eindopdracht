import * as Location from "expo-location";
import { Image, View } from "react-native";
import { styles } from "./Styles";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { fetchRestaurantData } from "../functions/fetchRestaurantData";
import { centsToEuros } from "../functions/centsToEuros";
import nightMapStyle from '../DarkModeMapsTheme.json'; // Import the JSON style file
import {theme} from "../functions/theme";
import {stylesheet} from "../functions/stylesheet";



export const MapScreen = ({currentRestaurant}) => {
    const [mcDonaldsLocations, setMcDonaldsLocations] = useState([]);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchLocations = async () => {
            const data = await fetchRestaurantData();
            setMcDonaldsLocations(data);
        };

        fetchLocations();
    }, []);


    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let markerLocation

    if (location) {
        markerLocation = { longitude: location.coords.longitude, latitude: location.coords.latitude, image: require('../assets/markers/mylocation.png')};
    } else {
        markerLocation = undefined
    }

    return (
        <View style={stylesheet.container}>
            <MapView
                style={stylesheet.map}
                region={{
                    latitude: currentRestaurant !== undefined ? currentRestaurant.latitude : 51.9175,
                    longitude: currentRestaurant !== undefined ? currentRestaurant.longitude : 4.4796,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.1821,
                }}
                {...(theme === 'dark' ? { customMapStyle: nightMapStyle } : {})} // Apply the night map style only when theme is dark
            >
                {mcDonaldsLocations.map((marker, i) => {
                    let imageSource;
                    let price = centsToEuros(marker.priceBigMac)
                    if (marker.priceBigMac < 405) {
                        imageSource = require('../assets/markers/cat1.png');
                    } else if (marker.priceBigMac < 445) {
                        imageSource = require('../assets/markers/cat2.png');
                    } else if (marker.priceBigMac < 485) {
                        imageSource = require('../assets/markers/cat3.png');
                    } else if (marker.priceBigMac < 525) {
                        imageSource = require('../assets/markers/cat4.png');
                    } else if (marker.priceBigMac < 575) {
                        imageSource = require('../assets/markers/cat5.png');
                    } else {
                        imageSource = require('../assets/markers/cat6.png');
                    }

                    return (
                        <Marker
                            key={i}
                            coordinate={{ longitude: marker.longitude, latitude: marker.latitude }}
                            title={marker.name}
                            description={`The price of a Big Mac at this location is: ${price}`}
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