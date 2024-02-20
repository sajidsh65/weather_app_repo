const apiKey = "af85f339d889c1469f2dd581a598d38e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".enter").style.display = "none";
        document.querySelector(".weather").style.display = "none";
    }
    else if(searchBox.value==""){
        document.querySelector(".enter").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "none";
    }
    else {
        var data = await response.json();

        // console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "/assets/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "/assets/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "/assets/rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "/assets/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "/assets/mist.png"
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "/assets/snow.png"
        }
        
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".enter").style.display = "none";
    }


}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
searchBox.addEventListener("keypress",(event)=>{
    if(event.key=="Enter"){
        checkWeather(searchBox.value);
    }
})

