import { Text, View } from "react-native";
import { calculateDistance } from "../functions/calculateDistance";
import { centsToEuros } from "../functions/centsToEuros";
import {styles} from "./Styles";
import {useContext} from "react";
import {AppContext} from "../store/context";

export function Item({ navigation, item, location }) {
    const {theme} = useContext(AppContext);
    const stylesheet = {... (theme === 'light' ? styles.lightMode : styles.darkMode),};

    const onPressItem = () => {
        navigation.navigate('Details', { navigation : navigation, item: item });
    };

    let distanceInKilometers = undefined

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
            <BaseListItem styleClass={stylesheet.itemPriceCategoryOne} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 445) {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategoryTwo} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 485) {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategoryThree} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 525) {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategoryFour} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 575) {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategoryFive} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    } else {
        return (
            <BaseListItem styleClass={stylesheet.itemPriceCategorySix} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    }
}

function BaseListItem({ styleClass, item, distanceInKilometers, onPressItem }) {
    const {theme} = useContext(AppContext);
    const stylesheet = {... (theme === 'light' ? styles.lightMode : styles.darkMode),};
    if (distanceInKilometers) {
        return (
            <View style={styleClass}>
                <Text style={stylesheet.listItemText} onPress={onPressItem}>{item.name}</Text>
                <Text style={stylesheet.listItemText} onPress={onPressItem}>{`Price Big Mac: ${centsToEuros(item.priceBigMac)}`}</Text>
                <Text style={stylesheet.listItemText} onPress={onPressItem}>{`Distance to Restaurant: ${distanceInKilometers} km`}</Text>
            </View>
        )
    } else {
        return (
            <View style={styleClass}>
                <Text style={stylesheet.listItemText} onPress={onPressItem}>{item.name}</Text>
                <Text style={stylesheet.listItemText} onPress={onPressItem}>{`Price Big Mac: ${centsToEuros(item.priceBigMac)}`}</Text>
            </View>
        )
    }

}
