export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the earth in kilometers

    const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);  // Convert degrees to radians
    };

    const deltaLat = toRadians(lat2 - lat1);  // Calculate the difference in latitude in radians
    const deltaLon = toRadians(lon2 - lon1);  // Calculate the difference in longitude in radians

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));  // Calculate the angular distance in radians

    const distance = earthRadius * c;  // Calculate the distance using the formula for the arc length of a great circle
    return distance;
};
