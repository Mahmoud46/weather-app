import type { TemperatureUnit } from "./weather.interface";
import type Weather from "./weather.interface";
import type { HourInfo } from "./WeatherForecast.interface";

export default interface ContextDataContent {
	tempUnit: TemperatureUnit;
	setTempUnit: React.Dispatch<React.SetStateAction<TemperatureUnit>>;
	weather: Weather | null;
	setWeather: React.Dispatch<React.SetStateAction<Weather | null>>;
	forecast: HourInfo[];
	setForecast: React.Dispatch<React.SetStateAction<HourInfo[]>>;
	hourlyWeather: HourInfo[];
	setHourlyWeather: React.Dispatch<React.SetStateAction<HourInfo[]>>;
	weatherTrend: HourInfo[];
	setWeatherTrend: React.Dispatch<React.SetStateAction<HourInfo[]>>;
	fetchWeather: (query: string) => Promise<void>;
}
