const startBtn = document.querySelector(".start");
const search = document.querySelector("#inputfield");
const searchIcon = document.querySelector("#searchIcon");
const desc = document.querySelector("#desc");
const temp = document.querySelector("#temp");
const cityName = document.querySelector("#city");
const wind = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humidityper");
const goHome = document.querySelector(".homeBtn");
const icon = document.querySelector("#icon");
const mainBox1 = document.querySelector(".mainBox1");
const mainBox2 = document.querySelector(".mainBox2");
const mainBox3 = document.querySelector(".mainBox3");

startBtn.addEventListener("click", () => {
    mainBox1.classList.add("inactive");
    mainBox2.classList.remove("inactive");
});

function changeIcon(weatherMain) {
    let icons = {
        Clouds: "image/clouds.png",
        Rain: "image/rain.png",
        Mist: "image/mist.png",
        Haze: "image/haze.png",
        Snow: "image/snow.png",  // Ensure this file exists correctly
        Clear: "image/clear.png",
    };
    icon.src = icons[weatherMain] || "image/clear.png"; // Default to clear weather icon
}

const url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "60c87147d8f6193adef70e580032a403";

async function getWeatherData(city) {
    try {
        let finalUrl = `${url}q=${city}&appid=${apiKey}&units=metric`; // Added &units=metric to get temperature in Celsius
        let weatherData = await fetch(finalUrl);
        let data = await weatherData.json();
        console.log(data);

        if (data.cod == 404) {
            mainBox2.classList.add("inactive");
            mainBox3.classList.remove("inactive");
            desc.innerHTML = "City not found";
            temp.innerHTML = "0°C";
            cityName.innerHTML = "Unknown";
            wind.innerHTML = "0 km/h";
            humidity.innerHTML = "0%";
            search.value = "";
            icon.src = "image/clear.png";
            return;
        }

        if (data.weather && data.weather.length > 0) {
            desc.innerHTML = data.weather[0].description;
            changeIcon(data.weather[0].main);
        }

        if (data.main) {
            temp.innerHTML = Math.round(data.main.temp) + "°C";
            wind.innerHTML = data.wind.speed + " km/h";
            humidity.innerHTML = data.main.humidity + "%";
        }

        cityName.innerHTML = data.name;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please check your internet connection.");
    }
}

searchIcon.addEventListener("click", () => {
    if (search.value.trim() !== "") {
        getWeatherData(search.value);
    }
});

search.addEventListener("keypress", (e) => {
    if (e.key == "Enter" && search.value.trim() !== "") {
        getWeatherData(search.value);
    }
});

goHome.addEventListener("click", () => {
    mainBox3.classList.add("inactive");
    mainBox1.classList.remove("inactive");
});
