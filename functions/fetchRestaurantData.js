export async function fetchRestaurantData() {
    //Check your expo ip (under the QR code. remove 'exp://' and the port) everytime you 'npx expo start' and replace the ip
    //Also make sure the backend repo is up-to-date locally and xampp is running
    const url =
        "https://stud.hosted.hr.nl/1028473/prg07-eindopdracht-webservice/";
    try {
        const response = await fetch(url);
        return(response.json());

    } catch (error) {
        console.error(error);
    }
}