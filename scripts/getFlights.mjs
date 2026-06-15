export async function getTargetFlight(departure_id, arrival_id, outbound_date) {

    const apiKey = "3cdcfa52016ff9f5c449c69623044d6aff87873e82575782f84c169275dadede"

    const flightsAPI = `https://serpapi.com/search?engine=google_flights&api_key=${apiKey}&departure_id=${departure_id}&arrival_id=${arrival_id}&outbound_date=${outbound_date}&type=2&sort_by=3`;

    try {
        const response = await fetch(flightsAPI);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}