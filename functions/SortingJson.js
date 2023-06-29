import { calculateDistance } from "./calculateDistance";

export const sortByDistance = (locations, location, ascending = true) => {
    return [...locations].sort((a, b) => {
        const distanceA = calculateDistance(a.latitude, a.longitude, location.coords.latitude, location.coords.longitude);
        const distanceB = calculateDistance(b.latitude, b.longitude, location.coords.latitude, location.coords.longitude);

        return ascending ? distanceA - distanceB : distanceB - distanceA;
    });
};

export const sortByPrice = (locations, ascending = true) => {
    const sortedLocations = [...locations].sort((a, b) => {
        return ascending ? a.priceBigMac - b.priceBigMac : b.priceBigMac - a.priceBigMac;
    });

    return sortedLocations;
};