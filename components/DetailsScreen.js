import {Text, View} from "react-native";  // Importing required components from react-native
import {centsToEuros} from "../functions/centsToEuros";  // Importing the centsToEuros function from "../functions/centsToEuros"
import {useContext, useEffect, useState} from "react";  // Importing useContext, useEffect, and useState hooks from react
import {AppContext} from "../store/context";  // Importing AppContext from "../store/context"
import {styles} from "./Styles";  // Importing custom styles from "./Styles"
import AsyncStorage from "@react-native-async-storage/async-storage";  // Importing AsyncStorage from "@react-native-async-storage/async-storage"

// Exporting DetailsScreen component
export const DetailsScreen = ({route, navigation}) => {
    const {theme} = useContext(AppContext);  // Using the useContext hook to access theme from AppContext
    const stylesheet = {...(theme === 'light' ? styles.lightMode : styles.darkMode)};  // Setting stylesheet based on the theme

    const item = route.params.item;  // Getting the item parameter from the route
    const [isFavorite, setIsFavorite] = useState(false);  // Initializing isFavorite state to false

    useEffect(() => {
        // Check if the current item is marked as a favorite
        checkFavoriteStatus();
    }, []);

    // Function to check if the current item is marked as a favorite
    const checkFavoriteStatus = async () => {
        try {
            const favorites = await AsyncStorage.getItem('favorites');  // Retrieving favorites from AsyncStorage
            if (favorites !== null) {
                const parsedFavorites = JSON.parse(favorites);  // Parsing the retrieved favorites
                setIsFavorite(parsedFavorites.includes(item.id));  // Checking if the current item's ID is in the favorites list
            }
        } catch (error) {
            console.error('Error retrieving favorites from AsyncStorage:', error);
        }
    };

    // Rendering the DetailsScreen component
    return (
        <View style={stylesheet.containerDetails}>
            <View>
                <Text style={stylesheet.heading}>{item.name}</Text>
                <Text style={stylesheet.detailsPageText}>{centsToEuros(item.priceBigMac)}</Text>
                <Text style={[stylesheet.detailsPageText, isFavorite ? stylesheet.detailsIsFavorite : null]}>
                    {isFavorite ? "Is in your favorites" : "Is not in your favorites"}
                </Text>
            </View>
            <View>
                <Text
                    onPress={() => navigation.navigate('Map', {
                        currentRestaurant: {
                            latitude: item.latitude,
                            longitude: item.longitude
                        }
                    })}
                    style={stylesheet.detailsButton}
                >
                    Go to Map
                </Text>
            </View>
        </View>
    );
};
