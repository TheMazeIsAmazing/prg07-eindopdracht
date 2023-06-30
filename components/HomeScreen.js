import {useContext, useEffect, useState} from "react";  // Importing useContext, useEffect, and useState hooks from react
import {fetchRestaurantData} from "../functions/fetchRestaurantData";  // Importing fetchRestaurantData function from "../functions/fetchRestaurantData"
import * as Location from "expo-location";  // Importing Location from expo-location
import {sortByDistance, sortByPrice} from "../functions/SortingJson";  // Importing sortByDistance and sortByPrice functions from "../functions/SortingJson"
import {FlatList, View} from "react-native";  // Importing FlatList and View from react-native
import {Picker} from "@react-native-picker/picker";  // Importing Picker from @react-native-picker/picker
import {Item} from "./Item";  // Importing Item component from "./Item"
import {NavBar} from "./NavBar";  // Importing NavBar component from "./NavBar"
import {AppContext} from "../store/context";  // Importing AppContext from "../store/context"
import {styles} from "./Styles";  // Importing custom styles from "./Styles"

// Exporting HomeScreen component
export const HomeScreen = ({navigation}) => {
    const {theme} = useContext(AppContext);  // Using the useContext hook to access theme from AppContext
    const stylesheet = {...(theme === 'light' ? styles.lightMode : styles.darkMode)};  // Setting stylesheet based on the theme

    const [currentSortingMethod, onChangeCurrentSortingMethod] = useState('price_ASC');  // Initializing currentSortingMethod state to 'price_ASC'
    const [mcDonaldsLocations, setMcDonaldsLocations] = useState([]);  // Initializing mcDonaldsLocations state to an empty array
    const [location, setLocation] = useState(null);  // Initializing location state to null
    const [hasLocationPermission, setHasLocationPermission] = useState(true);  // Initializing hasLocationPermission state to true

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
                setHasLocationPermission(false);  // Setting hasLocationPermission to false if permission is not granted
                return;
            }

            let location = await Location.getCurrentPositionAsync({});  // Getting the current location
            setLocation(location);  // Updating location state with the current location
        })();
    }, []);

    let sortedJSONData;
    if (currentSortingMethod === 'price_ASC') {
        sortedJSONData = sortByPrice(mcDonaldsLocations);  // Sorting by price in ascending order
    } else if (currentSortingMethod === 'price_DESC') {
        sortedJSONData = sortByPrice(mcDonaldsLocations, false);  // Sorting by price in descending order
    } else if (currentSortingMethod === 'distance_ASC') {
        sortedJSONData = sortByDistance(mcDonaldsLocations, location);  // Sorting by distance in ascending order
    } else if (currentSortingMethod === 'distance_DESC') {
        sortedJSONData = sortByDistance(mcDonaldsLocations, location, false);  // Sorting by distance in descending order
    }

    if (hasLocationPermission) {
        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.contentContainer}>
                    <Picker
                        style={stylesheet.picker}
                        selectedValue={currentSortingMethod}
                        onValueChange={(itemValue, itemIndex) =>
                            onChangeCurrentSortingMethod(itemValue)
                        }>
                        <Picker.Item label="Price ↑" value="price_ASC"/>
                        <Picker.Item label="Price ↓" value="price_DESC"/>
                        <Picker.Item label="Distance ↑" value="distance_ASC"/>
                        <Picker.Item label="Distance ↓" value="distance_DESC"/>
                    </Picker>
                    <FlatList
                        style={stylesheet.flatList}
                        data={sortedJSONData}
                        renderItem={({item}) => (
                            <Item item={item} navigation={navigation} location={location}/>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
                <NavBar navigation={navigation} currentPage="Home"/>
            </View>
        );
    } else {
        return (
            <View style={stylesheet.container}>
                <View style={stylesheet.contentContainer}>
                    <Picker
                        style={stylesheet.picker}
                        selectedValue={currentSortingMethod}
                        onValueChange={(itemValue, itemIndex) =>
                            onChangeCurrentSortingMethod(itemValue)
                        }>
                        <Picker.Item label="Price ↑" value="price_ASC"/>
                        <Picker.Item label="Price ↓" value="price_DESC"/>
                    </Picker>
                    <FlatList
                        style={stylesheet.flatList}
                        data={sortedJSONData}
                        renderItem={({item}) => (
                            <Item item={item} navigation={navigation} location={location}/>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
                <NavBar navigation={navigation} currentPage="Home"/>
            </View>
        );
    }
};
