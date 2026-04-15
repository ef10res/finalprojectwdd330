//Key and endpoints
const weatherKey = "c6a0627c84234f4398b105856251310";
const weatherURL = `https://api.weatherapi.com/v1/current.json?key=c6a0627c84234f4398b105856251310&q=sydney&aqi=no`;
const forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=c6a0627c84234f4398b105856251310&q=sydney&days=3&aqi=no&alerts=no`;

// Variables
const image = document.querySelector("#image");
const race = document.querySelector("#race");
const description = document.querySelector("#description");
const currentTemp = document.querySelector("#temperature");
const weatherToday = document.querySelector("#weather-today");
const weatherTomorrow = document.querySelector("#weather-tomorrow");
const weatherAfterTomorrow = document.querySelector("#weather-aftertomorrow");

// Fetch current weather data
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

//Display results in the weather div
function displayResults(data) {
    race.innerHTML = data.location.name;
    description.innerHTML = data.current.condition.text;
    currentTemp.innerHTML = `${data.current.temp_f}&deg;F`;
    const iconsrc = data.current.condition.icon;
    image.setAttribute('SRC', iconsrc)
    image.setAttribute('alt', data.current.condition.text)
}

// Fetch weather forecast
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
    // Get the forecast days array
    const days = data.forecast.forecastday;

    // Put the information into variables
    let todayTxt = days[0].day.condition.text;
    let tomorrowTxt = days[1].day.condition.text;
    let afterTomorrowTxt = days[2].day.condition.text;

    // Display the array information for the arrays into the elements
    weatherToday.innerHTML = ` H: ${Math.round(days[0].day.maxtemp_f)}°F, L: ${Math.round(days[0].day.mintemp_f)}°F, ${todayTxt}`;
    weatherTomorrow.innerHTML = ` H: ${Math.round(days[1].day.maxtemp_f)}°F, L: ${Math.round(days[1].day.mintemp_f)}°F, ${tomorrowTxt}`;
    weatherAfterTomorrow.innerHTML = ` H: ${Math.round(days[2].day.maxtemp_f)}°F, L: ${Math.round(days[2].day.mintemp_f)}°F, ${afterTomorrowTxt}`;
}

weatherFetch();
apiforecastFetch();

