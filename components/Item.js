import { Text, View } from "react-native";
import { calculateDistance } from "../functions/calculateDistance";
import { centsToEuros } from "../functions/centsToEuros";
import {stylesheet} from "../functions/stylesheet";

export function Item({ navigation, item, location }) {
    const onPressItem = () => {
        navigation.navigate('Details', { navigation : navigation, item: item });
    };

    let distanceInKilometers = calculateDistance(
        item.latitude,
        item.longitude,
        location.coords.latitude,
        location.coords.longitude
    ).toFixed(1);

    if (item.priceBigMac < 405) {

        return (
            <BaseListItem styles={stylesheet.itemPriceCategoryOne} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 445) {
        return (
            <BaseListItem styles={stylesheet.itemPriceCategoryTwo} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 485) {
        return (
            <BaseListItem styles={stylesheet.itemPriceCategoryThree} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 525) {
        return (
            <BaseListItem styles={stylesheet.itemPriceCategoryFour} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    } else if (item.priceBigMac < 575) {
        return (
            <BaseListItem styles={stylesheet.itemPriceCategoryFive} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    } else {
        return (
            <BaseListItem styles={stylesheet.itemPriceCategorySix} onPressItem={onPressItem} item={item} distanceInKilometers={distanceInKilometers}/>
        );
    }
}

function BaseListItem({ styles, item, distanceInKilometers, onPressItem }) {
    return (
        <View style={styles}>
            <Text style={stylesheet.listItemText} onPress={onPressItem}>{item.name}</Text>
            <Text style={stylesheet.listItemText} onPress={onPressItem}>{`Price Big Mac: ${centsToEuros(item.priceBigMac)}`}</Text>
            <Text style={stylesheet.listItemText} onPress={onPressItem}>{`Distance to Restaurant: ${distanceInKilometers} km`}</Text>
        </View>
    )
}
