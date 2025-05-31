import { useContext, type ReactNode } from "react";
import Header from "./Header";
import { User } from "lucide-react";
import cloudyAltBackgroundImage from "../assets/cloudy-alt.jpg";
import HourlyReadings from "./HourlyReadings";
import WeatherRecommendation from "./WeatherRecommendation";
import Analytics from "./Analytics";
import Graph from "./Graph";
import Context from "../Context/context";
import type ContextDataContent from "../interfaces/context.interface";

export default function RightSide(): ReactNode {
	const { weatherTrend, hourlyWeather } = useContext(
		Context
	) as ContextDataContent;

	return (
		<div className="flex flex-1 lg:max-w-[50%] flex-col gap-4 z-10 justify-between backdrop-blur-2xl">
			<Header className="hidden lg:flex" />
			<div className="lg:px-6 max-lg:mt-8 flex gap-1.5">
				<User size={20} className="mt-0.5 lg:hidden" />
				<h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold font-cabinet">
					Good Morning, Creative Ambition
				</h2>
			</div>

			<div className="flex flex-2 flex-col md:flex-row gap-3 rounded-lg lg:px-6">
				<div className="flex flex-col flex-1 md:max-w-[50%] border border-theme rounded-xl justify-center min-h-fit">
					<div className="hidden md:flex relative min-h-50 flex-1 border border-theme items-center justify-center rounded-2xl overflow-hidden">
						<img
							className="absolute object-cover inset-0 opacity-90"
							src={cloudyAltBackgroundImage}
							alt=""
						/>
						<Graph weatherData={hourlyWeather} graphStatus="past" />
					</div>
					<HourlyReadings />
				</div>
				<div className="flex flex-1 flex-col md-max-w-[50%] border border-theme rounded-xl items-center justify-center">
					<Analytics />
					<div className="hidden md:flex border-t border-theme flex-1">
						<WeatherRecommendation />
					</div>
				</div>
			</div>
			<div className="border relative border-theme flex flex-3 items-center justify-center rounded-xl min-h-50 max-h-60 lg:mx-6 lg:mb-6">
				<img
					className="absolute h-full w-full object-cover inset-0 rounded-xl"
					src={cloudyAltBackgroundImage}
					alt=""
				/>
				<Graph weatherData={weatherTrend} graphStatus="next" />
			</div>
			<div className="border border-theme rounded-lg flex md:hidden">
				<WeatherRecommendation />
			</div>
		</div>
	);
}
