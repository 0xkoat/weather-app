import { forecastContainer, forecastItem, CurrentConditions, Day } from "./types";

const errorBanner = document.getElementById("error-banner") as HTMLDivElement;
const errorText = document.getElementById("error-text") as HTMLSpanElement;
const loadingSpinner = document.getElementById("loading-spinner") as HTMLDivElement;

export function showError(message: string) {
  errorText.textContent = message;
  errorBanner.classList.remove("opacity-0", "pointer-events-none");
  errorBanner.classList.add("opacity-100");
  setTimeout(clearError, 4000);
}

export function clearError() {
  errorBanner.classList.add("opacity-0", "pointer-events-none");
  errorBanner.classList.remove("opacity-100");
}

export function showLoading() {
  loadingSpinner.classList.remove("hidden");
}

export function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

export function getIconURL(iconCode: string): string {
  return `/assets/icons/visualcrossing-color/${iconCode}.png`;
}

export function populateCurrent(container: forecastContainer, item: forecastItem) {
  (document.getElementById("current-temp") as HTMLElement).textContent = item.temp || "";
  (document.getElementById("current-feels") as HTMLElement).textContent = item.feelsLike || "";
  (document.getElementById("current-humidity") as HTMLElement).textContent = item.humidity || "";
  (document.getElementById("current-wind") as HTMLElement).textContent = item.wind || "";
  (document.getElementById("current-precip") as HTMLElement).textContent = item.precip || "0%";
  (document.getElementById("current-condition") as HTMLElement).textContent = `Condition: ${item.label || ""}`;
  (document.getElementById("current-sunrise") as HTMLElement).textContent = item.sunrise || "";
  (document.getElementById("current-sunset") as HTMLElement).textContent = item.sunset || "";    
    const iconWrapper = document.getElementById("current-icon-wrapper") as HTMLDivElement;
    const iconImg = document.getElementById("current-icon") as HTMLImageElement;

    if (item.icon) {
        iconImg.src = item.icon;
        iconWrapper.classList.remove("hidden");
    } else {
        iconImg.src = "";
        iconWrapper.classList.add("hidden");
    }
    container.wrapper.classList.remove("hidden");
}

export function populateGrid(container: forecastContainer, items: forecastItem[]) {
  while (container.content.firstChild) {
    container.content.removeChild(container.content.firstChild);
  }
  
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "flex flex-col items-center gap-2 bg-white/10 rounded-xl p-2 text-center text-sm";
    
    if (item.label) {
      const label = document.createElement("p");
      label.className = "font-medium";
      label.textContent = item.label;
      div.appendChild(label);
    }
    
    if (item.icon) {
      const img = document.createElement("img");
      img.src = item.icon;
      img.className = "w-10 h-10 mx-auto";
      img.alt = item.label || "Weather icon";
      div.appendChild(img);
    }
    
    if (item.temp) {
      const temp = document.createElement("p");
      const tempText = document.createTextNode("🌡 Temp: ");
      const tempSpan = document.createElement("span");
      tempSpan.className = "font-semibold";
      tempSpan.textContent = item.temp;
      temp.appendChild(tempText);
      temp.appendChild(tempSpan);
      div.appendChild(temp);
    }
    
    if (item.feelsLike) {
      const feels = document.createElement("p");
      const feelsText = document.createTextNode("🤗 Feels: ");
      const feelsSpan = document.createElement("span");
      feelsSpan.className = "font-semibold";
      feelsSpan.textContent = item.feelsLike;
      feels.appendChild(feelsText);
      feels.appendChild(feelsSpan);
      div.appendChild(feels);
    }
    
    if (item.humidity) {
      const humidity = document.createElement("p");
      const humidityText = document.createTextNode("💧 Humidity: ");
      const humiditySpan = document.createElement("span");
      humiditySpan.className = "font-semibold";
      humiditySpan.textContent = item.humidity;
      humidity.appendChild(humidityText);
      humidity.appendChild(humiditySpan);
      div.appendChild(humidity);
    }
    
    if (item.wind) {
      const wind = document.createElement("p");
      const windText = document.createTextNode("💨 Wind: ");
      const windSpan = document.createElement("span");
      windSpan.className = "font-semibold";
      windSpan.textContent = item.wind;
      wind.appendChild(windText);
      wind.appendChild(windSpan);
      div.appendChild(wind);
    }
    
    if (item.precip) {
      const precip = document.createElement("p");
      const precipText = document.createTextNode("🌧 Precip: ");
      const precipSpan = document.createElement("span");
      precipSpan.className = "font-semibold";
      precipSpan.textContent = item.precip;
      precip.appendChild(precipText);
      precip.appendChild(precipSpan);
      div.appendChild(precip);
    }
    
    if (item.sunrise) {
      const sunrise = document.createElement("p");
      const sunriseText = document.createTextNode("🌅 Sunrise: ");
      const sunriseSpan = document.createElement("span");
      sunriseSpan.className = "font-semibold";
      sunriseSpan.textContent = item.sunrise;
      sunrise.appendChild(sunriseText);
      sunrise.appendChild(sunriseSpan);
      div.appendChild(sunrise);
    }
    
    if (item.sunset) {
      const sunset = document.createElement("p");
      const sunsetText = document.createTextNode("🌇 Sunset: ");
      const sunsetSpan = document.createElement("span");
      sunsetSpan.className = "font-semibold";
      sunsetSpan.textContent = item.sunset;
      sunset.appendChild(sunsetText);
      sunset.appendChild(sunsetSpan);
      div.appendChild(sunset);
    }
    
    container.content.appendChild(div);
  });
  
  container.wrapper.classList.remove("hidden");
}

export function populateScroll(container: forecastContainer, items: forecastItem[]) {
  const scrollDiv = container.content as HTMLDivElement;
  
  while (scrollDiv.firstChild) {
    scrollDiv.removeChild(scrollDiv.firstChild);
  }

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "inline-block w-28 flex-shrink-0 bg-white/10 rounded-xl p-2 text-center text-sm flex flex-col items-center gap-2";
    
    if (item.label) {
      const label = document.createElement("p");
      label.className = "font-medium";
      label.textContent = item.label;
      div.appendChild(label);
    }
    
    if (item.icon) {
      const img = document.createElement("img");
      img.src = item.icon;
      img.className = "w-10 h-10 mx-auto";
      img.alt = item.label || "Weather icon";
      div.appendChild(img);
    }
    
    if (item.temp) {
      const temp = document.createElement("p");
      const tempText = document.createTextNode("🌡 ");
      const tempSpan = document.createElement("span");
      tempSpan.className = "font-semibold";
      tempSpan.textContent = item.temp;
      temp.appendChild(tempText);
      temp.appendChild(tempSpan);
      div.appendChild(temp);
    }
    
    if (item.feelsLike) {
      const feels = document.createElement("p");
      const feelsText = document.createTextNode("🤗 ");
      const feelsSpan = document.createElement("span");
      feelsSpan.className = "font-semibold";
      feelsSpan.textContent = item.feelsLike;
      feels.appendChild(feelsText);
      feels.appendChild(feelsSpan);
      div.appendChild(feels);
    }
    
    if (item.humidity) {
      const humidity = document.createElement("p");
      const humidityText = document.createTextNode("💧 ");
      const humiditySpan = document.createElement("span");
      humiditySpan.className = "font-semibold";
      humiditySpan.textContent = item.humidity;
      humidity.appendChild(humidityText);
      humidity.appendChild(humiditySpan);
      div.appendChild(humidity);
    }
    
    if (item.wind) {
      const wind = document.createElement("p");
      const windText = document.createTextNode("💨 ");
      const windSpan = document.createElement("span");
      windSpan.className = "font-semibold";
      windSpan.textContent = item.wind;
      wind.appendChild(windText);
      wind.appendChild(windSpan);
      div.appendChild(wind);
    }
    
    const precip = document.createElement("p");
    const precipText = document.createTextNode("🌧 ");
    const precipSpan = document.createElement("span");
    precipSpan.className = "font-semibold";
    precipSpan.textContent = item.precip ? item.precip : "0%";
    precip.appendChild(precipText);
    precip.appendChild(precipSpan);
    div.appendChild(precip);
    
    scrollDiv.appendChild(div);
  });

  container.wrapper.classList.remove("hidden");
}

export function updateCurrentWeather(container: forecastContainer, data: CurrentConditions) {
    const currentItem: forecastItem = {
        label: data.conditions,
        temp: data.temp.toString(),
        feelsLike: data.feelslike.toString(),
        humidity: data.humidity.toString(),
        wind: data.windspeed.toString(),
        precip: data.precipprob.toString(),
        sunrise: data.sunrise,
        sunset: data.sunset,
        icon: data.icon ? getIconURL(data.icon) : undefined
    };
    populateCurrent(container, currentItem);
}

export function updateDailyWeather(container: forecastContainer, days: Day[]) {
  const dailyItems: forecastItem[] = days.slice(0, 5).map(day => ({
    label: day.datetime,
    temp: day.temp.toString(),
    feelsLike: day.feelslike.toString(),
    humidity: day.humidity.toString(),
    wind: day.windspeed.toString(),
    precip: day.precipprob.toString() || "0%",
    sunrise: day.sunrise,
    sunset: day.sunset,
    icon: day.icon ? getIconURL(day.icon) : undefined
  }));
  populateGrid(container, dailyItems);
}

export function updateHourlyWeather(container: forecastContainer, days: Day[]) {
  const hourlyItems: forecastItem[] = days.flatMap(day => day.hours ?? []).slice(0, 24).map(hour => ({
    label: hour.datetime,
    temp: hour.temp.toString(),
    feelsLike: hour.feelslike.toString(),
    humidity: hour.humidity.toString(),
    wind: hour.windspeed.toString(),
    precip: hour.precipprob.toString(),
    icon: hour.icon ? getIconURL(hour.icon) : undefined
  }));
  populateScroll(container, hourlyItems);
}

export function updateRangeWeather(container: forecastContainer, days: Day[], date1?: string, date2?: string) {
    if (!date1 || !date2) {
        container.wrapper.classList.add("hidden");
        return;
    }
    const filteredDays = days.filter(day => {
        return day.datetime >= date1 && day.datetime <= date2;
    });

    const rangeItems: forecastItem[] = filteredDays.map(day => ({
        label: day.datetime,
        temp: day.temp.toString(),
        feelsLike: day.feelslike.toString(),
        humidity: day.humidity.toString(),
        wind: day.windspeed.toString(),
        precip: day.precipprob.toString(),
        sunrise: day.sunrise,
        sunset: day.sunset,
        icon: day.icon ? getIconURL(day.icon) : undefined
    }));
    
    if (rangeItems.length > 0) {
        populateGrid(container, rangeItems);
    } else {
        while (container.content.firstChild) {
            container.content.removeChild(container.content.firstChild);
        }
        const message = document.createElement("p");
        message.className = "text-center col-span-full";
        message.textContent = "No weather data available for this date range";
        container.content.appendChild(message);
        container.wrapper.classList.remove("hidden");
    }
}

export function toggleContainer(container: forecastContainer, show: boolean) {
  if (show) container.wrapper.classList.remove("hidden");
  else container.wrapper.classList.add("hidden");
}


