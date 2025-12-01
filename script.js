// const apikey = "8d3025fa0be813293ddd4fea4d4ebda5";
// const apiurl = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=`;

// const icon = document.querySelector(".weather-icon");
// const searchBox = document.querySelector(".search input");
// const searchBtn = document.querySelector(".search button");

// async function checkWeather(city) {
//   // LIVE API ↓
//   const response = await fetch(apiurl + city + `&appid=${apikey}`);

//   // LOCAL TEST ↓
//   // const response = await fetch("forecast.json");

//   if (response.status == 404) {
//     document.querySelector(".error").style.display = "block";
//     document.querySelector(".weather").style.display = "none";
//     return;
//   }

//   const data = await response.json();
//   console.log(data);

//   const container = document.getElementById("forecast");
//   container.innerHTML = ""; 

//   const timezoneOffset = data.city.timezone; 
//   const now = new Date();

//   // Find future forecasts
//   const nextForecasts = data.list.filter(item => {
//     const forecastDate = new Date((item.dt + timezoneOffset) * 1000);
//     return forecastDate > now;
//   });

//   let sameDayForecasts = [];
//   if (nextForecasts.length > 0) {
//     const firstDay = new Date((nextForecasts[0].dt + timezoneOffset) * 1000).getDate();

//     sameDayForecasts = nextForecasts.filter(item => {
//       const d = new Date((item.dt + timezoneOffset) * 1000);
//       return d.getDate() === firstDay;
//     });
//   }

//   sameDayForecasts.forEach((item) => {
//     const forecastDate = new Date((item.dt + timezoneOffset) * 1000);
//     const time = forecastDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//     const div = document.createElement("div");
//     div.className = "card";
//     div.innerHTML = `
//       <strong>${time}</strong><br>
//       🌡️ ${item.main.temp}°C<br>
//       💨 ${item.wind.speed} m/s<br>
//       💧 ${item.main.humidity}%<br>
//       ${item.weather[0].description}
//     `;
//     container.appendChild(div);
//   });

//   // Update City and Show UI
//   document.querySelector(".city").innerHTML = data.city.name;
//   document.querySelector(".error").style.display = "none";
//   document.querySelector(".weather").style.display = "block";
// }

//     document.querySelector(".weather").style.display = "block";
//     document.querySelector(".error").style.display = "none";
// // Search Button
// searchBtn.addEventListener("click", () => {
//   const city = searchBox.value.trim();
//   if (city) {
//     checkWeather(city);
//     searchBox.value = "";
//   }
// });










const apikey = "8d3025fa0be813293ddd4fea4d4ebda5";
const apiurl = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=`;

const icon = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  // const response = await fetch(apiurl + city + `&appid=${apikey}`);
  const response= await fetch("forecast.json")
  if (response.status == 404) {
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



  const container = document.getElementById("forecast");
  container.innerHTML = ""; // clear previous results

  const timezoneOffset = data.city.timezone; // seconds
  const now = new Date();

  // Step 1: Find all forecasts after current time
  const nextForecasts = data.list.filter(item => {
    const forecastDate = new Date((item.dt + timezoneOffset) * 1000);
    return forecastDate > now;
  });

  // Step 2: Determine which day the first forecast belongs to
  let sameDayForecasts = [];
  if (nextForecasts.length > 0) {
    const firstDay = new Date((nextForecasts[0].dt + timezoneOffset) * 1000).getDate();

    sameDayForecasts = nextForecasts.filter(item => {
      const d = new Date((item.dt + timezoneOffset) * 1000);
      return d.getDate() === firstDay;
    });
  }

  console.log("Same day forecasts:", sameDayForecasts);

  // Step 3: Display forecasts for that day
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
    container.appendChild(div);
  });

  // Step 4: Update city info and hide error
  document.querySelector(".city").innerHTML = data.city.name;
  document.querySelector(".error").style.display = "none";
  document.querySelector(".weather").style.display = "block";
}



    

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  
// 🔍 Search event
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
    searchBox.value = "";
  }
});
