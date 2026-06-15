const USVolcanosAPI = "https://volcanoes.usgs.gov/hans-public/api/volcano/getUSVolcanoes";

export async function getUSVolcanos() {
    try {
        const response = await fetch(USVolcanosAPI);
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