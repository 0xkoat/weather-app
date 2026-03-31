import { forecastContainer, forecastItem } from "./types";

const errorBanner = document.getElementById("error-banner") as HTMLDivElement;
const errorText = document.getElementById("error-text") as HTMLSpanElement;

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
  container.content.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "flex flex-col items-center gap-2 bg-white/10 rounded-xl p-2 text-center text-sm";
    div.innerHTML = `
      ${item.label ? `<p class="font-medium">${item.label}</p>` : ""}
      ${item.icon ? `<img src="${item.icon}" class="w-10 h-10 mx-auto">` : ""}
      ${item.temp ? `<p>🌡 Temp: <span class="font-semibold">${item.temp}</span></p>` : ""}
      ${item.feelsLike ? `<p>🤗 Feels: <span class="font-semibold">${item.feelsLike}</span></p>` : ""}
      ${item.humidity ? `<p>💧 Humidity: <span class="font-semibold">${item.humidity}</span></p>` : ""}
      ${item.wind ? `<p>💨 Wind: <span class="font-semibold">${item.wind}</span></p>` : ""}
      ${item.precip ? `<p>🌧 Precip: <span class="font-semibold">${item.precip}</span></p>` : ""}
      ${item.sunrise ? `<p>🌅 Sunrise: ${item.sunrise}</p>` : ""}
      ${item.sunset ? `<p>🌇 Sunset: ${item.sunset}</p>` : ""}`;
    container.content.appendChild(div);
  });
  container.wrapper.classList.remove("hidden");
}

export function populateScroll(container: forecastContainer, items: forecastItem[]) {
  const scrollDiv = container.content as HTMLDivElement;
  scrollDiv.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "inline-block w-28 flex-shrink-0 bg-white/10 rounded-xl p-2 text-center text-sm flex flex-col items-center gap-2";
    div.innerHTML = `
      ${item.label ? `<p class="font-medium">${item.label}</p>` : ""}
      ${item.icon ? `<img src="${item.icon}" class="w-10 h-10 mx-auto">` : ""}
      ${item.temp ? `<p>🌡 ${item.temp}</p>` : ""}
      ${item.feelsLike ? `<p>🤗 ${item.feelsLike}</p>` : ""}
      ${item.humidity ? `<p>💧 ${item.humidity}</p>` : ""}
      ${item.wind ? `<p>💨 ${item.wind}</p>` : ""}
      ${item.precip ? `<p>🌧 ${item.precip}</p>` : `<p>🌧 0%</p>`}
    `;
    scrollDiv.appendChild(div);
  });

  container.wrapper.classList.remove("hidden");
}

export function updateCurrentWeather(container: forecastContainer, data: any) {
    const currentItem: forecastItem = {
        label: data.conditions,
        temp: data.temp,
        feelsLike: data.feelslike,
        humidity: data.humidity,
        wind: data.windspeed,
        precip: data.precipprob,
        sunrise: data.sunrise,
        sunset: data.sunset,
        icon: data.icon ? getIconURL(data.icon) : undefined
    };
    populateCurrent(container, currentItem);
}

export function updateDailyWeather(container: forecastContainer, days: any[] ){
  const dailyItems: forecastItem[] = days.slice(0,  5).map(day => ({
    label: day.datetime,
    temp: day.temp,
    feelsLike: day.feelslike,
    humidity: day.humidity,
    wind: day.windspeed,
    precip: day.precipprob || "0%",
    sunrise: day.sunrise,
    sunset: day.sunset,
    icon: day.icon ? getIconURL(day.icon) : undefined
  }));
  populateGrid(container, dailyItems);
}

export function updateHourlyWeather(container: forecastContainer, days: any[]) {
  const hourlyItems: forecastItem[] = days.flatMap(day => day.hours ?? []).slice(0, 24).map(hour => ({
    label: hour.datetime,
    temp: hour.temp,
    feelsLike: hour.feelslike,
    humidity: hour.humidity,
    wind: hour.windspeed,
    precip: hour.precipprob,
    icon: hour.icon ? getIconURL(hour.icon) : undefined
  }));
  populateScroll(container, hourlyItems);
}

export function updateRangeWeather(container: forecastContainer, days: any[], date1?: string, date2?: string) {
    if (!date1 || !date2) {
        container.wrapper.classList.add("hidden");
        return;
    }


    const rangeItems: forecastItem[] = days
        .map(day => ({
            label: day.datetime,
            temp: day.temp,
            feelsLike: day.feelslike,
            humidity: day.humidity,
            wind: day.windspeed,
            precip: day.precipprob,
            sunrise: day.sunrise,
            sunset: day.sunset,
            icon: day.icon ? getIconURL(day.icon) : undefined
  }));
    if (rangeItems.length > 0) {
        populateGrid(container, rangeItems);
    } else {
        container.wrapper.classList.add("hidden");
    }
}

export function toggleContainer(container: forecastContainer, show: boolean) {
  if (show) container.wrapper.classList.remove("hidden");
  else container.wrapper.classList.add("hidden");
}


