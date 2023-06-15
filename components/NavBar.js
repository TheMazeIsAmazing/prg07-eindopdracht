import { Text, View } from "react-native";
import { styles } from "./Styles";

export const NavBar = ({navigation, currentPage}) => {
    return (
        <View style={styles.navbar}>
            <Text onPress={() => navigation.navigate('Home')} style={currentPage === 'Home' ? styles.navbarButtonActive : styles.navbarButton}>Home</Text>
            <Text onPress={() => navigation.navigate('Map')} style={currentPage === 'Map' ? styles.navbarButtonActive : styles.navbarButton}>Map</Text>
            <Text onPress={() => navigation.navigate('Settings', { name: 'Jane' })} style={currentPage === 'Settings' ? styles.navbarButtonActive : styles.navbarButton}>Settings</Text>
        </View>

    );
}