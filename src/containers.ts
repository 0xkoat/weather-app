import { forecastContainer } from "./types";

export const currentWeather: forecastContainer = {
  wrapper: document.getElementById("current-weather")!,
  content: document.getElementById("current-weather")!,
  type: "grid"
};

export const dailyWeather: forecastContainer = {
  wrapper: document.getElementById("daily-weather")!,
  content: document.getElementById("daily-container")!,
  type: "grid",
  maxItems: 5
};

export const hourlyWeather: forecastContainer = {
  wrapper: document.getElementById("hourly-weather")!,
  content: document.getElementById("hourly-container")!,
  type: "scroll"
};

export const rangeWeather: forecastContainer = {
  wrapper: document.getElementById("range-weather")!,
  content: document.getElementById("range-container")!,
  type: "grid"
};