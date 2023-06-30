import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [theme, setTheme] = useState(Appearance.getColorScheme());  // Initialize theme state with the device's current color scheme

    useEffect(() => {
        // Load the theme from async storage on component mount
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme !== null) {
                setTheme(storedTheme);
            }
        } catch (error) {
            console.error('Error loading theme from AsyncStorage:', error);
        }
    };

    const setAndStoreTheme = async (newTheme) => {
        try {
            setTheme(newTheme);
            await AsyncStorage.setItem('theme', newTheme);  // Store the new theme in async storage
        } catch (error) {
            console.error('Error storing theme in AsyncStorage:', error);
        }
    };

    return (
        <AppContext.Provider
            value={{theme, setTheme: setAndStoreTheme}}
        >
            {children}
        </AppContext.Provider>
    );
};

export {AppContext, AppContextProvider};
