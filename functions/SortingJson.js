import {calculateDistance} from "./calculateDistance";

// Sorts the locations array based on distance from the user's current location
export const sortByDistance = (locations, location, ascending = true) => {
    return [...locations].sort((a, b) => {
        // Calculate the distance between location 'a' and the user's current location
        const distanceA = calculateDistance(a.latitude, a.longitude, location.coords.latitude, location.coords.longitude);
        // Calculate the distance between location 'b' and the user's current location
        const distanceB = calculateDistance(b.latitude, b.longitude, location.coords.latitude, location.coords.longitude);

        // Sort the locations array based on the calculated distances
        return ascending ? distanceA - distanceB : distanceB - distanceA;
    });
};

// Sorts the locations array based on the price of the Big Mac at each location
export const sortByPrice = (locations, ascending = true) => {
    // Create a copy of the locations array to avoid modifying the original array
    const sortedLocations = [...locations].sort((a, b) => {
        // Sort the locations based on the priceBigMac property
        return ascending ? a.priceBigMac - b.priceBigMac : b.priceBigMac - a.priceBigMac;
    });

    return sortedLocations;
};
