import { loadHeaderFooter } from "./utils.mjs";
import { date } from "./utils.mjs";
import { navBar } from "./utils.mjs";
import { getTargetFlight } from "./getFlights.mjs";

loadHeaderFooter();
date();
navBar("current");

const flightData = await getTargetFlight("GEG", "ANC", "2026-06-16");
console.log(flightData);