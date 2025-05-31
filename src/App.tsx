import type { ReactNode } from "react";
import Header from "./components/Header";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import Forecast from "./components/Forecast";

function App(): ReactNode {
	return (
		<div className="flex flex-col h-screen w-full bg-theme transition-colors duration-300 overflow-auto">
			<Header className="flex lg:hidden" />
			<main className="flex flex-1 flex-col justify-center p-2 md:px-6 lg:p-0 lg:flex-row">
				<LeftSide />
				<RightSide />
			</main>
			<Forecast className="lg:hidden" />
		</div>
	);
}

export default App;
