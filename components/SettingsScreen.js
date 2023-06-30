import {Text, View} from "react-native";  // Importing required components from react-native
import {NavBar} from "./NavBar";  // Importing custom NavBar component from "./NavBar"
import {useContext} from "react";  // Importing useContext hook from react
import {AppContext} from "../store/context";  // Importing AppContext from "../store/context"
import {StatusBar} from "expo-status-bar";  // Importing StatusBar component from "expo-status-bar" package
import {styles} from "./Styles";  // Importing custom styles from "./Styles"

// Exporting SettingsScreen component
export const SettingsScreen = ({navigation}) => {
    const {theme, setTheme} = useContext(AppContext);  // Using the useContext hook to access theme and setTheme from AppContext
    const stylesheet = {...(theme === 'light' ? styles.lightMode : styles.darkMode)};  // Setting stylesheet based on the theme

    // Rendering the SettingsScreen component
    return (
        <View style={stylesheet.container}>
            <View style={stylesheet.contentContainer}>
                <Text style={stylesheet.settingsPageLabel}>Theme</Text>
                <Text
                    onPress={() => theme === 'light' ? setTheme('dark') : setTheme('light')}  // Changing the theme based on user interaction
                    style={stylesheet.settingsButton}
                >
                    {theme === 'light' ? "Change to Dark Mode" : "Change to Light Mode"}
                </Text>
                <StatusBar style="auto"/>
            </View>
            <NavBar navigation={navigation} currentPage="Settings"/> // Rendering the custom NavBar component
        </View>
    );
};
