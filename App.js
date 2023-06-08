import { StatusBar } from 'expo-status-bar';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{title: 'Find the cheapest Big Mac near you!'}}
              />
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const HomeScreen = ({navigation}) => {
  return (
      <View style={styles.container}>
          <View style={styles.contentContainer}>
              <Text>Todo, here will be the list!</Text>
          </View>
          <NavBar navigation={navigation} currentPage="Home"/>
      </View>
  );
};


const MapScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text>Todo, here will be the map!</Text>
            </View>
            <NavBar navigation={navigation} currentPage="Map"/>
        </View>
    );
};

const NavBar = ({navigation, currentPage}) => {
    return (
            <View style={styles.navbar}>
                <Pressable
                    style={currentPage === 'Home' ? styles.navbarButtonActive : styles.navbarButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.navbarButtonText}>Home</Text>
                </Pressable>
                <Pressable
                    style={currentPage === 'Map' ? styles.navbarButtonActive : styles.navbarButton}
                    onPress={() => navigation.navigate('Map')}
                >
                    <Text style={styles.navbarButtonText}>Map</Text>
                </Pressable>
                <Pressable
                    style={currentPage === 'Settings' ? styles.navbarButtonActive : styles.navbarButton}
                    onPress={() => navigation.navigate('Settings', { name: 'Jane' })}
                >
                    <Text style={styles.navbarButtonText}>Settings</Text>
                </Pressable>
            </View>

    );
}

const SettingsScreen = ({navigation, route}) => {
  return (
      <View style={styles.container}>
          <View style={styles.contentContainer}>
              <Text>This is {route.params.name}'s Epic Settings page!!!!!!</Text>
          </View>
          <NavBar navigation={navigation} currentPage="Settings"/>
      </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
    },
    navbarButtonActive: {
        backgroundColor:'#f1ce09',
        height: 30,
        width: "20%",
        alignItems: "center",
    },
    navbarButton: {
        backgroundColor:'#c0c0c0',
        height: 30,
        width: "20%",
        alignItems: "center",
    },
    navbarButtonText: {
        color:  "black"
    },
    navbar: {
        flexDirection: "row",
        gap: 30,
        paddingBottom: 10
    }

});
