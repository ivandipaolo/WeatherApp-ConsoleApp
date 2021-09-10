const fs = require('fs');
const axios = require('axios');

class Researches {

    searchHistory = [];
    dbPath = './db/database.json';

    constructor () {
        this.readDB(this.dbPath);
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'lenguage': 'en'
        }
    }
    get paramsWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY
        }
    }

    async city( place = '' ) {
        try {
            const instance = axios.create ({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            })
            
            const resp = await instance.get();
            return resp.data.features.map((place) =>({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1],
            }))
        } catch (error) {
            return [];
        };
    }

    async weather(lat, lon) {
        const instance = axios.create ({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {...this.paramsWeather, lat, lon}
        })
        
        const resp = await instance.get();
        const {weather, main} = resp.data;
        return{
            desc: weather[0].description,
            min: main.temp_min,
            max: main.temp_max,
            temp: main.temp
        }
    }

    addToHistory (place = ''){
        if (this.searchHistory.includes(place)){
            return;
        }else{
            this.searchHistory.push(place);
        }
        this.saveDB();
    }

    saveDB(){
        const toObj = {
            history: this.searchHistory
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(toObj));
    }

    readDB(){
        if(fs.existsSync(this.dbPath)){
            const data = JSON.parse(fs.readFileSync(this.dbPath, {encoding: 'utf-8'}));
            this.searchHistory = data.history;
            return data;
        } else{
            return null;
        }
    }
}

module.exports = Researches;