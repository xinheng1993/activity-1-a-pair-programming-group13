document.addEventListener('DOMContentLoaded', () => {
    const city = document.getElementById('city');
    city.addEventListener('blur', () => {
        if (!city.value.trim()) {
            city.classList.add('invalid');
        } else {
            city.classList.remove('invalid');
        }
    });
});

function getWeather() {
    const cityName = document.getElementById('city').value;
    
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('result').classList.remove('visible');

    if (!cityName) {
        document.getElementById('result').innerHTML = "Please input a city.";
        return;
    }
    fetch('http://127.0.0.1:5000/lookup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cityName: cityName }),
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
    let content = "";
    if(data.cod == 200){
        content += `<p class="weather-item"><strong>City Name:</strong> ${data.name}</p>`;
        content += formatNestedObject(data.coord, "Coordinates");
        content += formatWeather(data.weather[0]);
        content += formatNestedObject(data.main, "Main Information");
        content += formatNestedObject(data.wind, "Wind");
        content += formatNestedObject(data.clouds, "Clouds");
        content += `<p class="weather-item"><strong>Base:</strong> ${data.base}</p>`;
        content += `<p class="weather-item"><strong>Visibility:</strong> ${data.visibility} meters</p>`;
        document.getElementById('result').innerHTML = content;
    } else {
        document.getElementById('result').innerHTML = data.message
    }
    })
    .catch(error => {
        document.getElementById('result').innerHTML = "Error fetching weather data."
        console.log('Error:', error);
    });
}

// Function to format general nested objects
function formatNestedObject(obj, title = "") {
    let formatted = "";
    if (title) {
    formatted += `<p class="weather-item"><strong>${title}:</strong></p>`;
    }

    formatted += "<ul>";
    for (const subKey in obj) {
    if (obj.hasOwnProperty(subKey)) {
        if (typeof obj[subKey] === 'object') {
        formatted += `<li><strong>${subKey}:</strong> ${JSON.stringify(obj[subKey])}</li>`;
        } else {
        formatted += `<li><strong>${subKey}:</strong> ${obj[subKey]}</li>`;
        }
    }
    }
    formatted += "</ul>";
    return formatted;
}

// Function to format weather data, including the icon
function formatWeather(weather) {
    let formatted = `<p class="weather-item"><strong>Weather:</strong></p>`;
    formatted += `<ul>
    <li><strong>Description:</strong> ${weather.description}</li>
    <li><strong>Main:</strong> ${weather.main}</li>
    </ul>`;
    return formatted;
}
