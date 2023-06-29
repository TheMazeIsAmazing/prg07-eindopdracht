import {useContext, useEffect, useState} from "react";
import {fetchRestaurantData} from "../functions/fetchRestaurantData";
import * as Location from "expo-location";
import {sortByDistance, sortByPrice} from "../functions/SortingJson";
import {FlatList, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Item} from "./Item";
import {NavBar} from "./NavBar";
import {AppContext} from "../store/context";
import {styles} from "./Styles";

export const HomeScreen = ({navigation}) => {
    const {theme} = useContext(AppContext);
    const stylesheet = {...(theme === 'light' ? styles.lightMode : styles.darkMode)};

    const [currentSortingMethod, onChangeCurrentSortingMethod] = useState('price_ASC');
    const [mcDonaldsLocations, setMcDonaldsLocations] = useState([]);
    const [location, setLocation] = useState(null);
    const [hasLocationPermission, setHasLocationPermission] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            const data = await fetchRestaurantData();
            setMcDonaldsLocations(data);
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setHasLocationPermission(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let sortedJSONData;
    if (currentSortingMethod === 'price_ASC') {
        sortedJSONData = sortByPrice(mcDonaldsLocations);
    } else if (currentSortingMethod === 'price_DESC') {
        sortedJSONData = sortByPrice(mcDonaldsLocations, false);
    } else if (currentSortingMethod === 'distance_ASC') {
        sortedJSONData = sortByDistance(mcDonaldsLocations, location);
    } else if (currentSortingMethod === 'distance_DESC') {
        sortedJSONData = sortByDistance(mcDonaldsLocations, location, false);
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
