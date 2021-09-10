const {readInput, inquireMenu, pause, listOfPlaces} = require('./helpers/inquirer');
const Researches = require('./models/researches');
require('dotenv').config();
const main  = async() =>{
    let opt;
    const reasearches = new Researches();

    do {
        opt = await inquireMenu();
        switch (opt) {
            case '1':
            const search = await readInput('City for search:')
            const places = await reasearches.city(search);
            console.log(`Information of:`.bold, `${search}`.green.bold);
            const idx = await listOfPlaces(places);
            const match = places.find(pl => idx === pl.id);
            reasearches.addToHistory(match.name);
            const weather = await reasearches.weather(match.lat, match.lng);
            console.clear();
            console.log(`Place:` + match.name);
            console.log(`Lat:` + match.lat);
            console.log(`Lng:` + match.lng);
            console.log(`Temperature: ${weather.temp}°K`);
            console.log(`Min: ${weather.min}°K`);
            console.log(`Max: ${weather.max}°K`);
            console.log(`Now: ${weather.desc}`);
            break;
            case '2':
                reasearches.searchHistory.forEach((place, i) => {
                    console.log(`${i+1}. `.green.bold + `${place}`.bold);
                })
                break;
            default:
                await pause();
                reasearches.readDB();
                break;
            }
        } while (opt !== '0');


}
main();