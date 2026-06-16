const USVolcanosAPI = "https://volcanoes.usgs.gov/hans-public/api/volcano/getUSVolcanoes";
const elevatedVolcanos = "https://volcanoes.usgs.gov/hans-public/api/volcano/getCapElevated";

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

export async function getElevatedVolcanos() {
    try {
        const response = await fetch(elevatedVolcanos);
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