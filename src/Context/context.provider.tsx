import { useEffect, useRef, useState, type ReactNode } from "react";
import type ContextDataContent from "../interfaces/context.interface";
import Context from "./context";
import type Weather from "../interfaces/weather.interface";
import {
	API_Key,
	BASE_URL,
	DEFAULT_CITY,
	HOURS_BACK,
} from "../constants/api.constants";
import type { HourInfo } from "../interfaces/WeatherForecast.interface";
import type { TemperatureUnit } from "../interfaces/weather.interface";

export default function ContextProvider({ children }: { children: ReactNode }) {
	const [tempUnit, setTempUnit] = useState<TemperatureUnit>(
		(localStorage.getItem("preferred_temp_unit") || "C") as TemperatureUnit
	);
	const [weather, setWeather] = useState<Weather | null>(null);
	const [forecast, setForecast] = useState<HourInfo[]>([]);

	const [hourlyWeather, setHourlyWeather] = useState<HourInfo[]>([]);
	const [weatherTrend, setWeatherTrend] = useState<HourInfo[]>([]);

	const [loading, setLoading] = useState<boolean>(false);
	const hasFetched = useRef(false);

	const fetchWeather = async (query: string) => {
		setLoading(true);
		try {
			const response = await fetch(
				`${BASE_URL}?key=${API_Key}&days=2&q=${query}&alert=no&aqi=no`
			);

			if (!response.ok) throw new Error("Failed to fetch weather data");

			const weatherData: Weather = await response.json();
			if (weatherData) setWeather(weatherData);

			// Get the tomorrow's forecast
			const forecastTomorrow: HourInfo[] =
				weatherData.forecast.forecastday[1].hour
					.filter((hour) => new Date(hour.time).getHours() % 3 == 0)
					.map((hour) => ({
						...hour,
						time: new Date(hour.time).toLocaleTimeString("en-US", {
							hour: "numeric",
							hour12: true,
						}),
					}));

			// Past 6 hours of the day
			const currentHour = new Date(weatherData.location.localtime).getHours();
			const forecastToday: HourInfo[] = weatherData.forecast.forecastday[0].hour
				.filter((hour) => {
					const forecastHour = new Date(hour.time).getHours();
					return (
						forecastHour > currentHour - HOURS_BACK &&
						forecastHour <= currentHour
					);
				})
				.map((hour) => ({
					...hour,
					time: new Date(hour.time).toLocaleTimeString("en-US", {
						hour: "numeric",
						hour12: true,
					}),
				}));

			const weatherTrendToday = weatherData.forecast.forecastday[0].hour
				.filter((hours) => {
					const hour = new Date(hours.time).getHours();
					return hour > currentHour && hour <= currentHour + HOURS_BACK;
				})
				.map((hour) => ({
					...hour,
					time: new Date(hour.time).toLocaleTimeString("en-US", {
						hour: "numeric",
						hour12: true,
					}),
				}));

			setForecast(forecastTomorrow);
			setHourlyWeather(forecastToday);
			setWeatherTrend(weatherTrendToday);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const getLocation = () => {
		// To prevent fetching twice
		if (hasFetched.current) return;
		hasFetched.current = true;

		if (navigator.geolocation)
			navigator.geolocation.getCurrentPosition(
				(currentPosition) => {
					const { latitude, longitude } = currentPosition.coords;
					fetchWeather(`${latitude}, ${longitude}`);
				},
				() => {
					console.warn("Geolocation denied, using default city");
					fetchWeather(DEFAULT_CITY);
				}
			);
		else {
			console.warn("Geolocation not supported, using default city");
			fetchWeather(DEFAULT_CITY);
		}
	};

	useEffect(getLocation, []);

	const contextValue: ContextDataContent = {
		tempUnit,
		setTempUnit,
		weather,
		setWeather,
		forecast,
		setForecast,
		hourlyWeather,
		setHourlyWeather,
		weatherTrend,
		setWeatherTrend,
		fetchWeather,
	};

	return (
		<Context.Provider value={contextValue}>
			{loading && (
				<div className="flex flex-col items-center justify-center h-screen bg-black text-white">
					<div className="w-5 h-10 border-4 border-gray-300 rounded-full animate-spin"></div>
				</div>
			)}
			{children}
		</Context.Provider>
	);
}
