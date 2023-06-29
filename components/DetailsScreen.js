import {Text, View} from "react-native";
import {centsToEuros} from "../functions/centsToEuros";
import {useContext} from "react";
import {AppContext} from "../store/context";
import {styles} from "./Styles";

export const DetailsScreen = ({route}) => {
    const {theme} = useContext(AppContext);
    const stylesheet = {... (theme === 'light' ? styles.lightMode : styles.darkMode),};
    const item = route.params.item;

    return (
        <View style={stylesheet.container}>
            <Text style={stylesheet.heading}>{item.name}</Text>
            <Text>{centsToEuros(item.priceBigMac)}</Text>
        </View>);
};