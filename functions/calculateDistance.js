export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the earth in kilometers

    const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
    };

    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);


    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));


    const distance = earthRadius * c;
    return distance;
};