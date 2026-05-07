 const apiKey = '93887dfea0f751980d52e9943be35c96'; 
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherData(cityInput.value);
    }
});

async function getWeatherData(city) {
    try {
        // Fetch Current Weather
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        updateUI(data);
        getForecast(data.coord.lat, data.coord.lon);
        
    } catch (error) {
        alert(error.message);
    }
}

function updateUI(data) {
    document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `${data.wind.speed} km/h`;
    document.getElementById('description').innerText = data.weather[0].description;
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Simple date formatting
    const now = new Date();
    document.getElementById('date').innerText = now.toLocaleDateString('en-US', { 
        weekday: 'long', month: 'long', day: 'numeric' 
    });
}

async function getForecast(lat, lon) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    const container = document.getElementById('forecast-container');
    container.innerHTML = ''; // Clear previous

    // Filter for 12:00 PM readings to get 1 per day
    const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        const item = document.createElement('div');
        item.classList.add('forecast-item');
        item.innerHTML = `
            <p>${date}</p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="icon">
            <p><strong>${Math.round(day.main.temp)}°C</strong></p>
        `;
        container.appendChild(item);
    });
}

// Initial Call for a default city
window.onload = () => getWeatherData('New York');
