import {Text, View} from "react-native";
import {calculateDistance} from "../functions/calculateDistance";
import {centsToEuros} from "../functions/centsToEuros";
import {styles} from "./Styles";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../store/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Item({navigation, item, location}) {
    const {theme} = useContext(AppContext);
    const stylesheet = {...(theme === 'light' ? styles.lightMode : styles.darkMode)};

    const onPressItem = () => {
        navigation.navigate('Details', {navigation: navigation, item: item});
    };

    let distanceInKilometers = undefined;

    if (location) {
        distanceInKilometers = calculateDistance(
            item.latitude,
            item.longitude,
            location.coords.latitude,
            location.coords.longitude
        ).toFixed(1);
    }

    if (item.priceBigMac < 405) {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategoryOne} onPressItem={onPressItem} item={item}
                          distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 445) {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategoryTwo} onPressItem={onPressItem} item={item}
                          distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 485) {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategoryThree} onPressItem={onPressItem} item={item}
                          distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 525) {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategoryFour} onPressItem={onPressItem} item={item}
                          distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 575) {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategoryFive} onPressItem={onPressItem} item={item}
                          distanceInKilometers={distanceInKilometers}/>
        );
    } else {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategorySix} onPressItem={onPressItem} item={item}
                          distanceInKilometers={distanceInKilometers}/>
        );
    }
}

function BaseListItem({styleClass, item, distanceInKilometers, onPressItem}) {
    const {theme} = useContext(AppContext);
    const stylesheet = {...(theme === 'light' ? styles.lightMode : styles.darkMode)};
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

    const onPressItemFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem('favorites');
            let parsedFavorites = [];

            if (favorites !== null) {
                parsedFavorites = JSON.parse(favorites);
            }

            // Toggle the favorite status
            if (parsedFavorites.includes(item.id)) {
                // Remove from favorites
                const updatedFavorites = parsedFavorites.filter((id) => id !== item.id);
                setIsFavorite(false);
                await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            } else {
                // Add to favorites
                parsedFavorites.push(item.id);
                setIsFavorite(true);
                await AsyncStorage.setItem('favorites', JSON.stringify(parsedFavorites));
            }
        } catch (error) {
            console.error('Error storing favorites in AsyncStorage:', error);
        }
    };

    if (distanceInKilometers) {
        return (
            <View style={styleClass}>
                <View>
                    <Text style={stylesheet.listItemText} onPress={onPressItem}>{item.name}</Text>
                    <Text style={stylesheet.listItemText}
                          onPress={onPressItem}>{`Price Big Mac: ${centsToEuros(item.priceBigMac)}`}</Text>
                    <Text style={stylesheet.listItemText}
                          onPress={onPressItem}>{`Distance to Restaurant: ${distanceInKilometers} km`}</Text>
                </View>
                <Text
                    key={item.id}
                    style={[stylesheet.favoriteHeart, isFavorite ? stylesheet.favoriteHeartActive : null]}
                    onPress={onPressItemFavorite}
                >
                    ♡
                </Text>
            </View>
        );
    } else {
        return (
            <View style={styleClass}>
                <View>
                    <Text style={stylesheet.listItemText} onPress={onPressItem}>{item.name}</Text>
                    <Text style={stylesheet.listItemText}
                          onPress={onPressItem}>{`Price Big Mac: ${centsToEuros(item.priceBigMac)}`}</Text>
                </View>
                <Text
                    style={[stylesheet.favoriteHeart, isFavorite ? stylesheet.favoriteHeartActive : null]}
                    onPress={onPressItemFavorite}
                >
                    ♡
                </Text>
            </View>
        );
    }
}
