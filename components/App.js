import { StatusBar } from 'expo-status-bar';
import {useContext} from 'react';
import {AppContext} from '../store/context';
import {styles} from "./Styles";
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "./HomeScreen";
import {MapScreen} from "./MapScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SettingsScreen} from "./SettingsScreen";
import {DetailsScreen} from "./DetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    const {theme} = useContext(AppContext);
    const stylesheet = {... (theme === 'light' ? styles.lightMode : styles.darkMode),};
    return (
        <NavigationContainer>
            <StatusBar style="auto"/>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options=
                        {theme === 'light' ?
                            {
                                title: 'Find the cheapest Big Mac near you!',
                                headerStyle: {
                                    backgroundColor: '#FFF1E3',
                                },
                                headerTintColor: '#181b1c', // Text color for light theme
                            }
                        :
                            {
                                title: 'Find the cheapest Big Mac near you!',
                                headerStyle: {
                                    backgroundColor: '#181b1c',
                                },
                                headerTintColor: '#FFF1E3', // Text color for dark theme
                            }
                        }
                />
                <Stack.Screen
                    name="Map"
                    component={MapScreen}
                    options=
                        {theme === 'light' ?
                            {
                                title: 'Map',
                                headerStyle: {
                                    backgroundColor: '#FFF1E3',
                                },
                                headerTintColor: '#181b1c', // Text color for light theme
                            }
                            :
                            {
                                title: 'Map',
                                headerStyle: {
                                    backgroundColor: '#181b1c',
                                },
                                headerTintColor: '#FFF1E3', // Text color for dark theme
                            }
                        }
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options=
                        {theme === 'light' ?
                            {
                                title: 'Settings',
                                headerStyle: {
                                    backgroundColor: '#FFF1E3',
                                },
                                headerTintColor: '#181b1c', // Text color for light theme
                            }
                            :
                            {
                                title: 'Settings',
                                headerStyle: {
                                    backgroundColor: '#181b1c',
                                },
                                headerTintColor: '#FFF1E3', // Text color for dark theme
                            }
                        }
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options=
                        {
                            theme === 'light' ?
                            {
                                title: 'Details',
                                headerStyle: {
                                    backgroundColor: '#FFF1E3',
                                },
                                headerTintColor: '#181b1c', // Text color for light theme
                            }
                            :
                            {
                                title: 'Details',
                                headerStyle: {
                                    backgroundColor: '#181b1c',
                                },
                                headerTintColor: '#FFF1E3', // Text color for dark theme
                            }
                        }
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}