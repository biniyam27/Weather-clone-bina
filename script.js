const apikey = "8d3025fa0be813293ddd4fea4d4ebda5";
const apiurl = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=`;

const icon = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
document.querySelector(".welcome-page").style.display = "block";
document.querySelector(".error").style.display = "none";
document.querySelector(".weather").style.display = "none";
async function checkWeather(city) {
  // const response = await fetch(apiurl + city + `&appid=${apikey}`);
  const response= await fetch("forecast.json")
  if (response.status == 404) {
    document.querySelector(".welcome-page").style.display = "none";
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const data = await response.json();
  console.log(data);
const place=data.city.name;
const country=data.city.country? data.city.country : '';
document.querySelector(".city").innerHTML = `<span>${place}, ${country}</span>`;
    document.querySelector(".temp").innerHTML =
    Math.round(data.list[0].main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.list[0].main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.list[0].wind.speed + " km/h";

    if (data.list[0].weather[0].main == "Clouds") {
      icon.src = "images/clouds.png";
    } else if (data.list[0].weather[0].main == "Clear") {
      icon.src = "images/clear.png";
    } else if (data.list[0].weather[0].main == "Rain") {
      icon.src = "images/rain.png";
    } else if (data.list[0].weather[0].main == "Drizzle") {
      icon.src ="images/drizzle.png";
    } else if (data.list[0].weather[0].main == "Mist") {
      icon.src = "images/mist.png";
    } else if (data.list[0].weather[0].main == "Snow") {
      icon.src = "images/snow.png";
    }



  const forecast = document.getElementById("forecast");
  forecast.innerHTML = ""; // clear previous results

  const timezoneOffset = data.city.timezone; // seconds
  const now = new Date();

  const nextForecasts = data.list.filter(item => {
    const forecastDate = new Date((item.dt + timezoneOffset) * 1000);
    return forecastDate > now;
  });

  let sameDayForecasts = [];
  if (nextForecasts.length > 0) {
    const firstDay = new Date((nextForecasts[0].dt + timezoneOffset) * 1000).getDate();

    sameDayForecasts = nextForecasts.filter(item => {
      const d = new Date((item.dt + timezoneOffset) * 1000);
      return d.getDate() === firstDay;
    });
  }

  console.log("Same day forecasts:", sameDayForecasts);


  sameDayForecasts.forEach((item) => {
    const forecastDate = new Date((item.dt + timezoneOffset) * 1000);
    const time = forecastDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${time}</strong><br>
      🌡️ ${item.main.temp}°C<br>
      💨 ${item.wind.speed} m/s<br>
      💧 ${item.main.humidity}%<br>
      ${item.weather[0].description}
    `;
    forecast.appendChild(div);
  });

  document.querySelector(".city").innerHTML = data.city.name.toUpperCase();
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".welcome-page").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
    searchBox.value = "";
  }
});

const container=document.querySelector('.container');
const scrollHandler=()=>{
  if(container.scrollTop > 10){
    container.classList.add('scrolled');
  }else{
    container.classList.remove('scrolled')
  }
}
container.addEventListener('scroll',scrollHandler)