import { useContext, type ReactNode } from "react";
import Context from "../Context/context";
import type ContextDataContent from "../interfaces/context.interface";

import { getRecommendation } from "../utils/weatherRecommendation";

export default function WeatherRecommendation(): ReactNode {
	const { weather } = useContext(Context) as ContextDataContent;

	const recommendation = getRecommendation(weather);

	return (
		<div className="flex flex-col p-3 w-full h-full">
			<h3 className="text-lg font-semibold mb-2">
				Today&apos;s Recommendation
			</h3>

			<div className="flex items-center gap-3 p-3">
				<div className="p-2 bg-theme-foreground">{recommendation.icon}</div>
				<div className="flex-1">
					<h4 className="font-medium text-base">{recommendation.title}</h4>
					<p className="text-[12px] opacity-80">{recommendation.message}</p>
				</div>
			</div>
		</div>
	);
}
