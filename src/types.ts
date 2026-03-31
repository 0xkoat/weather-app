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