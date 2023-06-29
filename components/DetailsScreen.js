import {Text, View} from "react-native";
import {centsToEuros} from "../functions/centsToEuros";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../store/context";
import {styles} from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DetailsScreen = ({route, navigation}) => {
    const {theme} = useContext(AppContext);
    const stylesheet = {... (theme === 'light' ? styles.lightMode : styles.darkMode),};

    const item = route.params.item;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        // Check if the current item is marked as a favorite
        checkFavoriteStatus();
    }, []);

    const checkFavoriteStatus = async () => {
        try {
            const favorites = await AsyncStorage.getItem('favorites');
            if (favorites !== null) {
                const parsedFavorites = JSON.parse(favorites);
                setIsFavorite(parsedFavorites.includes(item.id));
            }
        } catch (error) {
            console.error('Error retrieving favorites from AsyncStorage:', error);
        }
    };

    return (
        <View style={stylesheet.containerDetails}>
            <View>
                <Text style={stylesheet.heading}>{item.name}</Text>
                <Text style={stylesheet.detailsPageText}>{centsToEuros(item.priceBigMac)}</Text>
                <Text style={[stylesheet.detailsPageText, isFavorite ? stylesheet.detailsIsFavorite : null]}>{[isFavorite ? "Is in your favorites" : "Is not in your favorites" ]}</Text>
            </View>
            <View>
                <Text onPress={() => navigation.navigate('Map', { currentRestaurant: {latitude: item.latitude, longitude: item.longitude} })} style={stylesheet.detailsButton}>Go to Map</Text>
            </View>
        </View>);
};