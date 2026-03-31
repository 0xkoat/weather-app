import './style.css';
import { getWeather } from './api';
import * as UI from './weatherUI';
import * as Container from './containers';
import * as  validator from 'validator';
import { Options } from './types';

const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;
const cityInput = document.getElementById('city-input') as HTMLInputElement;
const errorClose = document.getElementById("error-close") as HTMLButtonElement;
const unitSelect = document.getElementById("unit-select") as HTMLSelectElement;
const langSelect = document.getElementById("lang-select") as HTMLSelectElement;
const startDateInput = document.getElementById("start-date") as HTMLInputElement;
const endDateInput = document.getElementById("end-date") as HTMLInputElement;
const hours = document.getElementById("hourly-checkbox") as HTMLInputElement;
const days = document.getElementById("daily-checkbox") as HTMLInputElement;

let isLoading :boolean= false ;
export let cachedData: any = null;




export const options: Options = {
    unitGroup: unitSelect.value,
    lang: langSelect.value,
    date1: "",
    date2: ""
};


function sanitizeCityName(city: string) {
    const sanitized = validator.whitelist(city, "a-zA-Z '’-"); 
    return sanitized.trim();
}

function renderUI() {
  if (!cachedData) return;

  UI.updateCurrentWeather(Container.currentWeather, cachedData.currentConditions);

  if (days.checked && cachedData.days) {
    UI.updateDailyWeather(Container.dailyWeather, cachedData.days);
  } else {
    UI.toggleContainer(Container.dailyWeather, false);
  }

  if (hours.checked && cachedData.days) {
    UI.updateHourlyWeather(Container.hourlyWeather, cachedData.days);
  } else {
    UI.toggleContainer(Container.hourlyWeather, false);
  }

  if (options.date1 && options.date2 && cachedData.days) {
    UI.updateRangeWeather(
      Container.rangeWeather,
      cachedData.days,
      options.date1,
      options.date2
    );
  } else {
    UI.toggleContainer(Container.rangeWeather, false);
  }
}




async function fetchWeather() {
  if (isLoading) return;

  UI.clearError();
  const currentCity = sanitizeCityName (cityInput.value.trim());

  options.date1 = startDateInput.value.trim();
  options.date2 = endDateInput.value.trim();

  if (!currentCity) {
    UI.showError("Please enter a city name");
    return;
  }

  isLoading = true;
  searchBtn.disabled = true;

  try {
    cachedData = await getWeather(currentCity, options);
    renderUI();
  } catch (error: any) {
    switch (error.message) {
      case "CITY_NOT_FOUND":
        UI.showError("City not found. Please check the name");
        break;
      case "INVALID_API_KEY":
        UI.showError("Invalid API key");
        break;
      case "RATE_LIMIT":
        UI.showError("Too many requests. Try again later");
        break;
      case "NETWORK_ERROR":
        UI.showError("Network error. Check your connection");
        break;
      default:
        UI.showError("Something went wrong");
    }
  } finally {
    isLoading = false;
    searchBtn.disabled = false;
  }
}
 

unitSelect.addEventListener("change", () => {
    options.unitGroup = unitSelect.value;
    if (cityInput.value.trim())  fetchWeather();
})

langSelect.addEventListener("change", () => {
    options.lang = langSelect.value;
    if (cityInput.value.trim())  fetchWeather();
})

searchBtn.addEventListener('click', fetchWeather);

cityInput.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') fetchWeather();
})

errorClose.addEventListener("click", UI.clearError);

days.addEventListener("change", renderUI);
hours.addEventListener("change", renderUI);