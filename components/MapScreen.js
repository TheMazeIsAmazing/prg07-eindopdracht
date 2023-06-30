import * as Location from "expo-location";  // Importing Location from expo-location
import {Image, View} from "react-native";  // Importing Image and View from react-native
import {styles} from "./Styles";  // Importing custom styles from "./Styles"
import MapView, {Marker} from "react-native-maps";  // Importing MapView and Marker from react-native-maps
import {useContext, useEffect, useState} from "react";  // Importing useContext, useEffect, and useState hooks from react
import {fetchRestaurantData} from "../functions/fetchRestaurantData";  // Importing fetchRestaurantData function from "../functions/fetchRestaurantData"
import {centsToEuros} from "../functions/centsToEuros";  // Importing centsToEuros function from "../functions/centsToEuros"
import nightMapStyle from '../DarkModeMapsTheme.json';  // Importing the JSON style file
import {AppContext} from "../store/context";  // Importing AppContext from "../store/context"

export const MapScreen = ({route}) => {
    const {theme, setTheme} = useContext(AppContext);  // Using the useContext hook to access theme and setTheme from AppContext
    const stylesheet = {...(theme === 'light' ? styles.lightMode : styles.darkMode)};  // Setting stylesheet based on the theme

    const [mcDonaldsLocations, setMcDonaldsLocations] = useState([]);  // Initializing mcDonaldsLocations state to an empty array
    const [location, setLocation] = useState(null);  // Initializing location state to null

    useEffect(() => {
        const fetchLocations = async () => {
            const data = await fetchRestaurantData();  // Fetching restaurant data using fetchRestaurantData function
            setMcDonaldsLocations(data);  // Updating mcDonaldsLocations state with fetched data
        };

        fetchLocations();  // Calling fetchLocations function
    }, []);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();  // Requesting location permission
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});  // Getting the current location
            setLocation(location);  // Updating location state with the current location
        })();
    }, []);

    let markerLocation;

    if (location) {
        markerLocation = {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            image: require('../assets/markers/mylocation.png')
        };  // Setting markerLocation with current location information
    } else {
        markerLocation = undefined;
    }

    let currentRestaurant = route.params?.currentRestaurant;

    return (
        <View style={stylesheet.container}>
            <MapView
                style={stylesheet.map}
                region={{
                    latitude: currentRestaurant !== undefined ? currentRestaurant.latitude : 51.9175,
                    longitude: currentRestaurant !== undefined ? currentRestaurant.longitude : 4.4796,
                    latitudeDelta: currentRestaurant !== undefined ? 0.0422 : 0.0822,
                    longitudeDelta: currentRestaurant !== undefined ? 0.0122 : 0.1821,
                }}
                {...(theme === 'dark' ? {customMapStyle: nightMapStyle} : {})} // Apply the night map style only when the theme is dark
            >
                {mcDonaldsLocations.map((marker, i) => {
                    let imageSource;
                    let price = centsToEuros(marker.priceBigMac);  // Converting price from cents to euros

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
                            coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
                            title={marker.name}
                            description={`The price of a Big Mac at this location is: ${price}`}
                        >
                            <Image source={imageSource} style={{height: 32, width: 21}}/>
                        </Marker>
                    );
                })}
                {markerLocation && (
                    <Marker
                        coordinate={{longitude: markerLocation.longitude, latitude: markerLocation.latitude}}
                        title="Your Location"
                        description="This is your current location"
                    >
                        <Image source={markerLocation.image} style={{height: 32, width: 32}}/>
                    </Marker>
                )}
            </MapView>
        </View>
    );
};
