import { Text, View } from "react-native";  // Importing Text and View from react-native
import { useContext } from "react";  // Importing useContext hook from react
import { AppContext } from "../store/context";  // Importing AppContext from "../store/context"
import { styles } from "./Styles";  // Importing custom styles from "./Styles"

export const NavBar = ({ navigation, currentPage }) => {
    const { theme } = useContext(AppContext);  // Using the useContext hook to access theme from AppContext
    const stylesheet = { ...(theme === 'light' ? styles.lightMode : styles.darkMode) };  // Setting stylesheet based on the theme

    return (
        <View style={stylesheet.navbar}>
            <Text onPress={() => navigation.navigate('Home')} style={currentPage === 'Home' ? stylesheet.navbarButtonActive : stylesheet.navbarButton}>Home</Text>
            <Text onPress={() => navigation.navigate('Map')} style={currentPage === 'Map' ? stylesheet.navbarButtonActive : stylesheet.navbarButton}>Map</Text>
            <Text onPress={() => navigation.navigate('Settings', { name: 'Jane' })} style={currentPage === 'Settings' ? stylesheet.navbarButtonActive : stylesheet.navbarButton}>Settings</Text>
        </View>
    );
};
