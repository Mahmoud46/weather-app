import type {
	ChangeTrend,
	ComfortLevel,
	TemperatureUnit,
} from "../interfaces/weather.interface";
import type Weather from "../interfaces/weather.interface";
import type { HourInfo } from "../interfaces/WeatherForecast.interface";

export const calculateTempChange = (
	hourlyWeather: HourInfo[],
	tempUnit: "C" | "F"
): ChangeTrend => {
	if (hourlyWeather?.length < 2) return { value: 0, trend: "stable" };

	const oldestTemp: number =
		tempUnit == "C" ? hourlyWeather[0]?.temp_c : hourlyWeather[0]?.temp_f;

	const newestTemp: number =
		tempUnit == "C"
			? hourlyWeather[hourlyWeather.length - 1]?.temp_c
			: hourlyWeather[hourlyWeather.length - 1]?.temp_f;

	const difference: number = newestTemp - oldestTemp;

	return {
		value: +Math.abs(difference).toFixed(1),
		trend: difference > 0 ? "rising" : difference < 0 ? "falling" : "stable",
	};
};

export const calculateUpcomingTrend = (
	weatherTrend: HourInfo[],
	tempUnit: TemperatureUnit
): ChangeTrend => {
	if (weatherTrend?.length < 2) return { value: 0, trend: "stable" };
	const firstTemp: number =
		tempUnit == "C" ? weatherTrend[0]?.temp_c : weatherTrend[0]?.temp_f;

	const lastTemp: number =
		tempUnit == "C"
			? weatherTrend[weatherTrend.length - 1]?.temp_c
			: weatherTrend[weatherTrend.length - 1]?.temp_f;

	const difference: number = lastTemp - firstTemp;

	return {
		value: +Math.abs(difference).toFixed(1),
		trend: difference > 0 ? "rising" : difference < 0 ? "falling" : "stable",
	};
};

export const calculateComfortLevel = (
	weather: Weather | null
): ComfortLevel => {
	if (
		weather?.current.humidity == undefined ||
		weather?.current.temp_c == undefined
	)
		return "Unknown";

	if (weather?.current.temp_c > 27) {
		if (weather?.current.humidity > 60) return "Uncomfortable";
		if (weather?.current.humidity > 40) return "Moderate";
		return "Comfortable";
	}

	if (weather?.current.temp_c < 10) {
		return "Cold";
	}

	return "Comfortable";
};
