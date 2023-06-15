import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mcDonaldsLocations } from './TemporaryJsonMcDonalds'
import { styles } from "./components/Styles";
import { NavBar } from "./components/NavBar";
import { Item } from "./components/Item";
import { MapScreen } from "./components/MapScreen";
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { sortByDistance, sortByPrice } from "./components/SortingJson";
import * as Location from "expo-location";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Find the cheapest Big Mac near you!',
                        headerStyle: {
                            backgroundColor: '#FFF1E3',
                        }
                    }}
                />
                <Stack.Screen
                    name="Map"
                    component={MapScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#FFF1E3',
                        }
                    }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#FFF1E3',
                        }
                    }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#FFF1E3',
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const HomeScreen = ({navigation}) => {
    const [currentSortingMethod, onChangeCurrentSortingMethod] = useState('price_ASC');
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
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
        <View style={styles.container}>
                <View style={styles.contentContainer}>
                        <Picker
                            selectedValue={currentSortingMethod}
                            onValueChange={(itemValue, itemIndex) =>
                                onChangeCurrentSortingMethod(itemValue)
                            }>
                            <Picker.Item label="Prijs ↑" value="price_ASC" />
                            <Picker.Item label="Prijs ↓" value="price_DESC" />
                            <Picker.Item label="Afstand ↑" value="distance_ASC" />
                            <Picker.Item label="Afstand ↓" value="distance_DESC" />
                        </Picker>
                        <FlatList
                            style={styles.flatList}
                            data={sortedJSONData}
                            renderItem={({item}) => <Item item={item} navigation={navigation} />}
                            keyExtractor={item => item.id.toString()}
                        />

                </View>
            <NavBar navigation={navigation} currentPage="Home"/>
        </View>
    );
};

const DetailsScreen = ({ route }) => {
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{item.name}</Text>
        </View>);
};


const SettingsScreen = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text>This is {route.params.name}'s Epic Settings page!!!!!!</Text>
            </View>
            <NavBar navigation={navigation} currentPage="Settings"/>
        </View>);
};