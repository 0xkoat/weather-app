export type forecastContainer = {
    wrapper: HTMLElement;
    content: HTMLElement;
    type: "grid" | "scroll";
    maxItems?: number;
}

export type forecastItem = {
    label?: string;
    temp?: string;
    feelsLike?: string;
    humidity?: string;
    wind?: string;
    precip?: string;
    sunrise?: string;
    sunset?: string;
    icon?: string;
    [key: string]: any;
}

export interface Options {
    date1?: string;
    date2?: string;
    unitGroup: string;
    lang: string;
}

export interface WeatherData {
    currentConditions: CurrentConditions;
    days: Day[];
}

export interface CurrentConditions {
    conditions: string;
    temp: number;
    feelslike: number;
    humidity: number;
    windspeed: number;
    precipprob: number;
    sunrise: string;
    sunset: string;
    icon: string;
}

export interface Day {
    datetime: string;
    temp: number;
    feelslike: number;
    humidity: number;
    windspeed: number;
    precipprob: number;
    sunrise: string;
    sunset: string;
    icon: string;
    hours?: Hour[];
}

export interface Hour {
    datetime: string;
    temp: number;
    feelslike: number;
    humidity: number;
    windspeed: number;
    precipprob: number;
    icon: string;
}