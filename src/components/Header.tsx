import { LucideMoon, LucideSun } from "lucide-react";
import type { ReactNode } from "react";
import toggleTheme from "../utils/toggleTheme";
import logoIcon from "../assets/logo.svg";

export default function Header({
	className,
}: {
	className: string;
}): ReactNode {
	return (
		<header
			className={`sticky top-0 z-50 flex items-center justify-between w-full max-lg:mb-2 bg-theme p-2 md:px-6 border-b border-theme ${className}`}
		>
			<div className="flex flex-1">
				{/* <CloudDrizzle /> */}
				<img src={logoIcon} className="size-[30px]" />
			</div>
			<div className="flex flex-1 justify-end">
				<button
					className="cursor-pointer size-8 flex justify-center items-center rounded-full"
					onClick={toggleTheme}
				>
					<LucideMoon className="flex dark:hidden" fill={"currentColor"} />
					<LucideSun className="hidden dark:flex" fill={"currentColor"} />
				</button>
			</div>
		</header>
	);
}
