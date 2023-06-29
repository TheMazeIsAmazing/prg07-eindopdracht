import {Button, Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {NavBar} from "./NavBar";
import {useContext} from "react";
import {AppContext} from "../store/context";
import {StatusBar} from "expo-status-bar";
import {styles} from "./Styles";

export const SettingsScreen = ({navigation}) => {
    const {theme,setTheme} = useContext(AppContext);
    const stylesheet = {... (theme === 'light' ? styles.lightMode : styles.darkMode),};
    return (
        <View style={stylesheet.container}>
            <View style={stylesheet.contentContainer}>
               <Text style={stylesheet.listItemText}>Open up App.js to start working on your app!</Text>
             <Button onPress={() => theme === 'light' ? setTheme('dark') : setTheme('light')} title={`Change theme`} />
          <StatusBar style= "auto"/>
            </View>
            <NavBar navigation={navigation} currentPage="Settings"/>
        </View>);
};
