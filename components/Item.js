import { Text, View } from "react-native";
import { styles } from "./Styles";

export function Item({ navigation, item }) {
    const onPressItem = () => {
        navigation.navigate('Details', { navigation:navigation, item: item });
    };

    if (item.priceBigMac < 405) {
        return (
            <View style={styles.itemPriceCategoryOne}>
                <Text onPress={onPressItem}>{item.name}</Text>
            </View>
        );
    } else if (item.priceBigMac < 445) {
        return (
            <View style={styles.itemPriceCategoryTwo}>
                <Text onPress={onPressItem}>{item.name}</Text>
            </View>
        );
    } else if (item.priceBigMac < 485) {
        return (
            <View style={styles.itemPriceCategoryThree}>
                <Text onPress={onPressItem}>{item.name}</Text>
            </View>
        );
    } else if (item.priceBigMac < 525) {
        return (
            <View style={styles.itemPriceCategoryFour}>
                <Text onPress={onPressItem}>{item.name}</Text>
            </View>
        );
    } else if (item.priceBigMac < 575) {
        return (
            <View style={styles.itemPriceCategoryFive}>
                <Text onPress={onPressItem}>{item.name}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.itemPriceCategorySix}>
                <Text onPress={onPressItem}>{item.name}</Text>
            </View>
        );
    }
}