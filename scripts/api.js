const weatherKey = "c6a0627c84234f4398b105856251310";
const weatherURL = `http://api.weatherapi.com/v1/current.json?key=c6a0627c84234f4398b105856251310&q=sydney&aqi=no`;
const forecastURL = `http://api.weatherapi.com/v1/forecast.json?key=c6a0627c84234f4398b105856251310&q=sydney&days=3&aqi=no&alerts=no`;

const image = document.querySelector("#image");
const race = document.querySelector("#race");
const description = document.querySelector("#description");
const currentTemp = document.querySelector("#temperature");
const weatherToday = document.querySelector("#weather-today");
const weatherTomorrow = document.querySelector("#weather-tomorrow");
const weatherAfterTomorrow = document.querySelector("#weather-aftertomorrow");

async function weatherFetch() {
    try {
        const response = await fetch(weatherURL);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    race.innerHTML = data.location.name;
    description.innerHTML = data.current.condition.text;
    currentTemp.innerHTML = `${data.current.temp_f}&deg;F`;
    const iconsrc = data.current.condition.icon;
    image.setAttribute('SRC', iconsrc)
    image.setAttribute('alt', data.weather[0].description)
}

async function apiforecastFetch() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecastResults(data)
                ;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecastResults(data) {
    let today = data.forecast.forecastday.day.condition.text;

    let tomorrow = data.forecast.forecastday[1].day.condition.text;

    let overTomorrow = data.list[2].weather[0].description;

    weatherToday.innerHTML = ` H: ${Math.round(data.list[0].main.temp_max)}&#176;F, L: ${Math.round(data.list[0].main.temp_min)}&#176;F, ${today}`;
    weatherTomorrow.innerHTML = ` H: ${Math.round(data.list[1].main.temp_max)}&#176;F, L: ${Math.round(data.list[1].main.temp_min)}&#176;F, ${tomorrow}`;
    weatherAfterTomorrow.innerHTML = ` H: ${Math.round(data.list[2].main.temp_max)}&#176;F, L: ${Math.round(data.list[2].main.temp_min)}&#176;F, ${overTomorrow}`;
}

weatherFetch();
apiforecastFetch();

const geoKey = AIzaSyArQnKaWafb0p5h2fy8TC40FFrdvNWw8q0

