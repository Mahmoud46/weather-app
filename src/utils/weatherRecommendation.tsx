import type Weather from "../interfaces/weather.interface";
import type { WeatherAlert } from "../interfaces/weather.interface";
import { CloudSnow, Sun, Thermometer, Umbrella, Wind } from "lucide-react";

export const getRecommendation = (weather: Weather | null): WeatherAlert => {
	const condition = weather?.current.condition.text.toLowerCase() ?? "";
	const temp_c = weather?.current.temp_c as number;
	const windSpeed = weather?.current.wind_kph as number;
	const humidity = weather?.current.humidity as number;

	if (
		condition.includes("rain") ||
		condition.includes("drizzle") ||
		condition.includes("shower")
	) {
		if (windSpeed > 24.14)
			// 15mph-> 24.14kph
			return {
				icon: <Wind className="text-blue-500" size={24} />,
				title: "Bring an umbrella and raincoat",
				message:
					"It's rainy and windy outside. An umbrella might not be enough, consider a raincoat too.",
			};

		return {
			icon: <Umbrella className="text-purple-500" size={24} />,
			title: "Bring an umbrella",
			message: "It's raining outside. An umbrella will make it safer.",
		};
	}

	if (
		condition.includes("snow") ||
		condition.includes("blizzard") ||
		condition.includes("sleet")
	)
		return {
			icon: <CloudSnow className="text-blue-500" size={24} />,
			title: "Dress warmly",
			message:
				"Snowy conditions expected. wear warm clothes and waterproof boots.",
		};
	if (temp_c > 85) {
		if (humidity > 70)
			return {
				icon: <Thermometer className="text-red-500" size={24} />,
				title: "Stay Hydrated",
				message: "It's hot outside. Stay hydrated to avoid heatstroke.",
			};
		return {
			icon: <Sun className="text-yellow-500" size={24} />,
			title: "Use sunscreen",
			message: "It's hot outside. Use sunscreen to protect your skin.",
		};
	}
	if (temp_c < 4)
		return {
			icon: <Thermometer className="text-blue-400" size={24} />,
			title: "Bundle up",
			message: "It's cold outside. Dress appropriately and bundle up.",
		};
	return {
		icon: <Sun className="text-yellow-400" size={24} />,
		title: "Sunny day",
		message: "Weather conditions are favorable. Have a great day!",
	};
};
