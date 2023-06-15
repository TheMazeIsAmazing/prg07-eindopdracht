import * as Location from "expo-location";
import { Button, Image, View } from "react-native";
import { styles } from "./Styles";
import MapView, { Marker } from "react-native-maps";
import { mcDonaldsLocations } from "../TemporaryJsonMcDonalds";
import { useEffect, useState } from "react";

export const MapScreen = ({currentRestaurant}) => {
    const [location, setLocation] = useState(null);

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
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: currentRestaurant !== undefined ? currentRestaurant.latitude : 51.9175,
                    longitude: currentRestaurant !== undefined ? currentRestaurant.longitude : 4.4796,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.1821,
                }}
            >
                {mcDonaldsLocations.map((marker, i) => {
                    let imageSource;
                    let price = `€ ${marker.priceBigMac / 100}`
                    if (price.length < 4) {
                        price =    `${price},-`
                    } else if (price.length < 6) {
                        price =    `${price}0`
                    }
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
                            description={`Een Big Mac kost hier: ${price}`}
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