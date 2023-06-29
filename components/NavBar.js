import { Text, View } from "react-native";
import {useContext} from "react";
import {AppContext} from "../store/context";
import {styles} from "./Styles";

export const NavBar = ({navigation, currentPage}) => {
    const {theme} = useContext(AppContext);
    const stylesheet = {... (theme === 'light' ? styles.lightMode : styles.darkMode),};
    return (
        <View style={stylesheet.navbar}>
            <Text onPress={() => navigation.navigate('Home')} style={currentPage === 'Home' ? stylesheet.navbarButtonActive : stylesheet.navbarButton}>Home</Text>
            <Text onPress={() => navigation.navigate('Map')} style={currentPage === 'Map' ? stylesheet.navbarButtonActive : stylesheet.navbarButton}>Map</Text>
            <Text onPress={() => navigation.navigate('Settings', { name: 'Jane' })} style={currentPage === 'Settings' ? stylesheet.navbarButtonActive : stylesheet.navbarButton}>Settings</Text>
        </View>

    );
}