 const apiKey = "eb3e3266efd53409d703de8f80864799";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weathericon");

        async function checkWeather(city) {
            const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

            if (response.status == 404) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                return;
            }

            var data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " Km/hr";

            if (data.weather[0].main === "Cloudy")
               weatherIcon.src ="image copy.png";
            else if (data.weather[0].main === "Clear")
                weatherIcon.src ="clear-sky.png";
            else if (data.weather[0].main === "Rain")
                weatherIcon.src ="thunder ico.png";
            else if (data.weather[0].main === "Drizzle")
                weatherIcon.src ="windy.png";
            else if (data.weather[0].main === "Mist")
                weatherIcon.src ="foggy_3621514.png";

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }

        searchBtn.addEventListener("click", () => {
            checkWeather(searchBox.value);
        });