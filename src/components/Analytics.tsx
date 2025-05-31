import { useContext, type ReactNode } from "react";
import Context from "../Context/context";
import type ContextDataContent from "../interfaces/context.interface";
import {
	calculateComfortLevel,
	calculateTempChange,
	calculateUpcomingTrend,
} from "../utils/analytics";
import type {
	ChangeTrend,
	ComfortLevel,
} from "../interfaces/weather.interface";
import {
	Activity,
	Sun,
	Thermometer,
	TrendingDown,
	TrendingUp,
	Umbrella,
} from "lucide-react";

export default function Analytics(): ReactNode {
	const { tempUnit, weather, weatherTrend, hourlyWeather } = useContext(
		Context
	) as ContextDataContent;

	const tempChange: ChangeTrend = calculateTempChange(hourlyWeather, tempUnit);
	const upComingTrend: ChangeTrend = calculateUpcomingTrend(
		weatherTrend,
		tempUnit
	);
	const comfortLevel: ComfortLevel = calculateComfortLevel(weather);

	return (
		<div className="flex flex-1 flex-col w-full h-full p-3">
			<h3 className="text-lg font-semibold mb-2">Weather Analytics</h3>

			<div className="grid grid-cols-2 gap-2 text-sm ">
				<div className="flex items-center gap-2 p-2">
					{tempChange.trend == "rising" ? (
						<TrendingUp className="text-red-400" size={18} />
					) : tempChange.trend == "falling" ? (
						<TrendingDown className="text-blue-400" size={18} />
					) : (
						<Activity size={18} className="text-blue-400" />
					)}
					<div>
						<p className="opacity-70 text-xs">Recent Trend</p>
						<p className="font-medium">
							{tempChange.value} {tempChange.trend}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2 p-2">
					{upComingTrend.trend == "rising" ? (
						<TrendingUp className="text-red-400" size={18} />
					) : upComingTrend.trend == "falling" ? (
						<TrendingDown className="text-blue-400" size={18} />
					) : (
						<Activity size={18} className="text-blue-400" />
					)}
					<div>
						<p className="opacity-70 text-xs">Upcoming</p>
						<p className="font-medium">
							{upComingTrend.value} {upComingTrend.trend}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2 p-2">
					<Thermometer size={18} className="text-orange-400" />
					<div>
						<p className="opacity-70 text-xs">Feels Like</p>
						<p className="font-medium">{comfortLevel}</p>
					</div>
				</div>

				<div className="flex items-center gap-2 p-2">
					<Sun size={18} className="text-yellow-400" />
					<div>
						<p className="opacity-70 text-xs">UV Index</p>
						<p className="font-medium">
							{weather?.current.condition.text.toLowerCase().includes("cloud")
								? "Low"
								: "Moderate"}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2 p-2 col-span-2">
					<Umbrella size={18} className="text-purple-400" />
					<div className="w-full">
						<p className="opacity-70">Precipitation Change</p>
						<div className="w-full bg-gray-200 h-2 rounded-full dark:bg-gray-700 mt-1">
							<div
								className="bg-blue-400 h-2 rounded-full"
								style={{
									width: `${
										weather?.current.condition.text
											.toLowerCase()
											.includes("rain")
											? "70"
											: "15"
									}%`,
								}}
							></div>
						</div>
						<p className="text-xs mt-1 flex justify-end">
							{weather?.current.condition.text.toLowerCase().includes("rain")
								? "High"
								: "Low"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
