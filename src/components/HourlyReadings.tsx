import { useContext, type ReactNode } from "react";
import Context from "../Context/context";
import type ContextDataContent from "../interfaces/context.interface";
import { HOURS_BACK } from "../constants/api.constants";

export default function HourlyReadings(): ReactNode {
	const { tempUnit, hourlyWeather } = useContext(Context) as ContextDataContent;

	return (
		<div className="w-full max-md:h-full">
			<p className="p-2 font-semibold">Past {HOURS_BACK} Hours</p>

			<div className="relative flex items-center overflow-x-auto gap-2 p-2">
				{hourlyWeather.map((hour, index) => (
					<div
						key={index}
						className="flex flex-col items-center p-3 min-w-[70px] rounded-xl bg-theme border border-theme"
					>
						<p className="text-sm font-medium">{hour.time}</p>
						<img className="w-8 h-8" src={hour.condition.icon} alt="" />
						<p className="text-lg font-semibold">
							{tempUnit == "C" ? hour.temp_c : hour.temp_f}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
