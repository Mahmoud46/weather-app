import { useContext, type ReactNode } from "react";
import cloudyBackgroundImage from "../assets/cloudy.jpg";
import {
	Droplets,
	LocateIcon,
	LucideThermometerSnowflake,
	LucideThermometerSun,
	SunIcon,
	Wind,
} from "lucide-react";
import Forecast from "./Forecast";
import Context from "../Context/context";
import type ContextDataContent from "../interfaces/context.interface";

export default function LeftSide(): ReactNode {
	const { weather, tempUnit, setTempUnit, fetchWeather } = useContext(
		Context
	) as ContextDataContent;

	const toggleUnit = () => {
		const newTempUnit = tempUnit == "C" ? "F" : "C";
		setTempUnit(newTempUnit);
		localStorage.setItem("preferred_temp_unit", newTempUnit);
	};

	return (
		<div className="border border-theme sticky top-0 max-h-screen flex flex-1 flex-col py-3 gap-4 items-center rounded-xl lg:rounded-none lg:border-0 lg:border-r overflow-hidden">
			<img
				src={cloudyBackgroundImage}
				alt=""
				className="absolute h-full w-full object-cover inset-0 opacity-50"
			/>

			<div className="lg:mb-auto relative flex flex-col items-center">
				<div
					className="flex items-center gap-2 cursor-pointer"
					onClick={() => {
						const userInput: string | null = prompt(
							"Enter a city or a country name"
						);
						if (userInput !== null && userInput.trim().length > 0) {
							fetchWeather(userInput as string);
						}
					}}
				>
					<LocateIcon size={20} className="mb-0.5" />
					<h2 className="text-lg lg:text-xl font-cabinet">
						{weather?.location.name ?? "Unavailable"} &bull;{" "}
						{weather?.location.country ?? "Unavailable"}
					</h2>
				</div>
				<p className="font-cabinet">
					{new Date(weather?.location.localtime as string).toLocaleTimeString(
						"en-US",
						{ hour: "numeric", minute: "numeric", hour12: true }
					)}{" "}
					&bull;{" "}
					{new Date(weather?.location.localtime as string).toLocaleDateString(
						"en-US",
						{
							day: "2-digit",
							month: "long",
							year: "numeric",
						}
					)}
				</p>
			</div>

			<div className="relative flex flex-col sm:flex-row lg:flex-col items-center my-auto gap-3 md:gap-4">
				<div className="flex gap-3 items-center">
					{weather && (
						<img
							src={weather?.current?.condition.icon}
							className="size-[50px] lg:size-[90px] 2xl:size-[100px]"
						/>
					)}
					{!weather && <SunIcon />}
					<p
						className="text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-cabinet cursor-pointer"
						onClick={toggleUnit}
					>
						{tempUnit == "C"
							? weather?.current.temp_c ?? "__"
							: weather?.current.temp_f ?? "__"}
						<span className="text-lg font-semibold">{tempUnit}</span>
					</p>
					<p className="text-base md:text-lg lg:text-xl capitalize ml-4">
						{weather?.current.condition.text ?? "weather unavailable"}
					</p>
				</div>

				<div className="flex gap-4 lg:gap-30 text-sm md:text-base lg:text-lg xl:text-4xl">
					<p className="flex items-center gap-1">
						<LucideThermometerSun color="red" size={20} opacity="70%" />
						{tempUnit == "C"
							? weather?.forecast.forecastday[0].day.maxtemp_c ?? "__"
							: weather?.forecast.forecastday[0].day.maxtemp_f ?? "__"}
					</p>
					<p className="flex items-center gap-1">
						<LucideThermometerSnowflake
							color="skyblue"
							size={20}
							opacity="70%"
						/>
						{tempUnit == "C"
							? weather?.forecast.forecastday[0].day.mintemp_c ?? "__"
							: weather?.forecast.forecastday[0].day.mintemp_f ?? "__"}
					</p>
				</div>
			</div>

			<div className="relative grid grid-cols-2 gap-2 lg:gap-4 w-full max-w-md px-2">
				<div className="flex items-center gap-2 p-4 rounded-xl backdrop-blur-md bg-theme-foreground border border-theme">
					<Droplets size={20} className="text-blue-400" />
					<div>
						<p className="text-sm opacity-70">Humidity</p>
						<p className="font-medium">{weather?.current.humidity ?? "__"}</p>
					</div>
				</div>
				<div className="flex items-center gap-2 p-4 rounded-xl backdrop-blur-md bg-theme-foreground border border-theme">
					<Wind size={20} className="text-gray-400" />
					<div>
						<p className="text-sm opacity-70">Wind</p>
						<p className="font-medium">{weather?.current.wind_kph ?? "__"}</p>
					</div>
				</div>
			</div>

			<Forecast className="hidden lg:flex w-full flex-col mt-auto relative" />
		</div>
	);
}
