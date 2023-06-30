import { Text, View } from "react-native";
import { NavBar } from "./NavBar";
import { useContext } from "react";
import { AppContext } from "../store/context";
import { StatusBar } from "expo-status-bar";
import { styles } from "./Styles";

export const SettingsScreen = ({ navigation }) => {
    const { theme, setTheme } = useContext(AppContext);
    const stylesheet = { ...(theme === 'light' ? styles.lightMode : styles.darkMode) };

    return (
        <View style={stylesheet.container}>
            <View style={stylesheet.contentContainer}>
                <Text style={stylesheet.settingsPageLabel}>Theme</Text>
                <Text
                    onPress={() => theme === 'light' ? setTheme('dark') : setTheme('light')}
                    style={stylesheet.settingsButton}
                >
                    {theme === 'light' ? "Change to Dark Mode" : "Change to Light Mode"}
                </Text>
                <StatusBar style="auto" />
            </View>
            <NavBar navigation={navigation} currentPage="Settings" />
        </View>
    );
};
