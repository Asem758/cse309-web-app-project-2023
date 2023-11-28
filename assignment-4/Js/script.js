let searchInp = document.querySelector('.weather_search');
let city = document.querySelector('.weather_city');
let day = document.querySelector('.weather_day');
let humidity = document.querySelector('.weather__indicator--humidity>.value');
let wind = document.querySelector('.weather__indicator--wind>.value');
let pressure = document.querySelector('.weather__indicator--pressure>.value');
let image = document.querySelector('.weather_image');
let temperature = document.querySelector('.weather_temperature>.value');
let forecastBlock = document.querySelector('.weather_forecast');
let suggetions = document.querySelector('#suggetions');
let weatherAPIKey = '19b8ab6d29c80602973511a630acfd7a';
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIKey;
let forecastBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid='
let cityBaseEndpoint = ' https://api.teleport.org/api/cities/?search ';
//let weatherImages = [{

//}]


let getWeatherByCityName = async(city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    if (response.status !== 200) {
        alert('City is not found!')
        return;
    }
    let weather = await response.json();
    return weather;
}
searchInp.addEventListener('keydown', async(e) => {
    if (e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchInp.value);
        updateCurrentWeather(weather);
    }

})
searchInp.addEventListener('input', async() => {
    let endpoint = cityBaseEndpoint + searchInp.value;
    let result = await (await fetch(endpoint)).json();
    suggetions.innerHTML = '';
    let cities = result._embedded['city:search-results'];
    let length = cities.length > 5 ? 5 : cities.length;
    for (i = 0; i < length; i++) {
        let option = document.createElement('option');
        option.value = cities[i].matching_full_name;
        suggetions.appendChild(option);
    }
    console.log(result);
})
let updateCurrentWeather = (data) => {
    console.log(data);
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = dayOfWeek();
    humidity.textContent = data.main.humidity;
    pressure.textContent = data.main.pressure;
    let windDirection;
    let deg = data.wind.deg;
    if (deg > 45 && deg <= 135) {
        windDirection = 'East';
    } else if (deg > 135 && deg <= 225) {
        windDirection = 'South';
    } else if (deg > 225 && deg <= 315) {
        windDirection = 'West';
    } else {
        windDirection = 'North';
    }
    wind.textContent = windDirection + ', ' + data.wind.speed;
    temperature.textContent = data.main.temp > 0 ?
        '+' + Math.round(data.main.temp) :
        Math.round(data.main.temp);
}
let dayOfWeek = () => {
    return new Date().toLocaleDateString('en-EN', { 'weekday': 'long' });
}