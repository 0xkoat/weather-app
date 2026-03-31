import { Options }  from "./types";

const API_KEY = process.env.API_KEY_WEATHER;
const BASE_URL = process.env.BASE_URL;

function urlBuild(city:string , options: Options):string{
    let URL = BASE_URL + `/${city}`;
    if (options.date1 && options.date1.trim() != "") {
        URL += `/${options.date1.trim()}`;
        if (options.date2 && options.date2.trim() != "") {
            URL += `/${options.date2.trim()}`;
        }
    }
    URL += `?unitGroup=${options.unitGroup}&lang=${options.lang}&include=days,hours,current,alerts,events&key=${API_KEY}&contentType=json`;
    return URL;
}

function errorHandling(response: number) {
     switch (response) {
            case 400:
            case 404: 
                throw new Error("CITY_NOT_FOUND");
            case 401: throw new Error("INVALID_API_KEY");
            case 403: throw new Error("ACCESS_DENIED");
            case 429: throw new Error("RATE_LIMIT");
            default: throw new Error("UNKNOWN_ERROR");           
        }
}

export async function getWeather(city: string, options: Options) {
    let response: Response;

    try {
        response = await fetch(urlBuild(city, options));
    } catch {
        throw new Error("NETWORK_ERROR");
    }

    if (!response.ok) {
        errorHandling(response.status);
    }

    return response.json();
}


