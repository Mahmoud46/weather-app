import { LucideHistory } from "lucide-react";
import { useContext, type ReactNode } from "react";
import type { HourInfo } from "../interfaces/WeatherForecast.interface";
import Context from "../Context/context";
import type ContextDataContent from "../interfaces/context.interface";
import type { TemperatureUnit } from "../interfaces/weather.interface";

function ForecastCard({
	forecastInfo,
	tempUnit,
}: {
	forecastInfo: HourInfo;
	tempUnit: TemperatureUnit;
}): ReactNode {
	return (
		<div className="flex flex-col items-center p-4 min-w-20 rounded-xl bg-theme-foreground border border-theme">
			<p className="font-medium">{forecastInfo.time}</p>
			{/* <CloudIcon /> */}
			<img src={forecastInfo.condition.icon} />
			<p className="mt-2">
				{tempUnit == "C" ? forecastInfo.temp_c : forecastInfo.temp_f}
			</p>
		</div>
	);
}

export default function Forecast({
	className,
}: {
	className: string;
}): ReactNode {
	const { tempUnit, forecast } = useContext(Context) as ContextDataContent;
	return (
		<section className={className}>
			<div className="mb-4 p-2 pb-0 md:px-6 lg:px-4 2xl:px-12 flex items-center gap-2">
				<LucideHistory size={20} />
				<h3 className="text-lg font-medium">Tomorrow&apos;s Forecast</h3>
			</div>

			<div className="flex overflow-x-auto pb-4 px-2 md:px-6 lg:px-4 gap-3 2xl:px-12">
				{forecast.map((hour, index) => (
					<ForecastCard forecastInfo={hour} tempUnit={tempUnit} key={index} />
				))}
			</div>
		</section>
	);
}
