import {StatusBar} from 'expo-status-bar';
import {Text, View, FlatList, Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {styles} from "./components/Styles";
import {NavBar} from "./components/NavBar";
import {fetchRestaurantData} from "./functions/fetchRestaurantData";
import {Item} from "./components/Item";
import {MapScreen} from "./components/MapScreen";
import {Picker} from '@react-native-picker/picker';
import {useEffect, useState} from "react";
import {sortByDistance, sortByPrice} from "./functions/SortingJson";
import * as Location from "expo-location";
// import getCurrentTheme from "./components/themeHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {centsToEuros} from "./functions/centsToEuros";
import {theme} from "./functions/theme";
import {stylesheet} from "./functions/stylesheet";

const Stack = createNativeStackNavigator();


export default function App() {
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


const HomeScreen = ({navigation}) => {
    const [currentSortingMethod, onChangeCurrentSortingMethod] = useState('price_ASC');
    const [mcDonaldsLocations, setMcDonaldsLocations] = useState([]);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchLocations = async () => {
            const data = await fetchRestaurantData();
            setMcDonaldsLocations(data);
        };

        fetchLocations();
    }, []);


    useEffect(() => {
        (async () => {

            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let sortedJSONData
    if (currentSortingMethod === 'price_ASC') {
        sortedJSONData = sortByPrice(mcDonaldsLocations);
    } else if (currentSortingMethod === 'price_DESC') {
        sortedJSONData = sortByPrice(mcDonaldsLocations, false);
    } else if (currentSortingMethod === 'distance_ASC') {
        sortedJSONData = sortByDistance(mcDonaldsLocations, location);
    } else if (currentSortingMethod === 'distance_DESC') {
        sortedJSONData = sortByDistance(mcDonaldsLocations, location, false);
    }
    return (
        <View style={stylesheet.container}>
            <View style={stylesheet.contentContainer}>
                <Picker
                    style={stylesheet.picker}
                    selectedValue={currentSortingMethod}
                    onValueChange={(itemValue, itemIndex) =>
                        onChangeCurrentSortingMethod(itemValue)
                    }>
                    <Picker.Item label="Price ↑" value="price_ASC"/>
                    <Picker.Item label="Price ↓" value="price_DESC"/>
                    <Picker.Item label="Distance ↑" value="distance_ASC"/>
                    <Picker.Item label="Distance ↓" value="distance_DESC"/>
                </Picker>
                <FlatList
                    style={stylesheet.flatList}
                    data={sortedJSONData}
                    renderItem={({item}) => <Item item={item} navigation={navigation} location={location}/>}
                    keyExtractor={item => item.id.toString()}
                />

            </View>
            <NavBar navigation={navigation} currentPage="Home"/>
        </View>
    );
};

const DetailsScreen = ({route}) => {
    const item = route.params.item;
    return (
        <View style={stylesheet.container}>
            <Text style={stylesheet.heading}>{item.name}</Text>
            <Text>{centsToEuros(item.priceBigMac)}</Text>
        </View>);
};


const SettingsScreen = ({navigation, route}) => {
    return (
        <View style={stylesheet.container}>
            <View style={stylesheet.contentContainer}>
                <Text>This is {route.params.name}'s Epic Settings page!!!!!!</Text>
                <Text>Choose Theme</Text>
                <Picker style={stylesheet.picker}>
                    <Picker.Item label="Price ↑" value="light"/>
                    <Picker.Item label="Price ↓" value="dark"/>
                </Picker>
            </View>
            <NavBar navigation={navigation} currentPage="Settings"/>
        </View>);
};
