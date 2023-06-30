export async function fetchRestaurantData() {
    const url = "https://stud.hosted.hr.nl/1028473/prg07-eindopdracht-webservice/";
    try {
        const response = await fetch(url);
        return response.json(); // Parse the response as JSON and return it as a Promise
    } catch (error) {
        console.error(error);
    }
}
