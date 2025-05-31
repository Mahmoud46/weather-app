import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global/index.css";
import App from "./App.tsx";
import ContextProvider from "./Context/context.provider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ContextProvider>
			<App />
		</ContextProvider>
	</StrictMode>
);
