export default function toggleTheme(): void {
	document.documentElement.classList.toggle("dark");

	if (document.documentElement.classList.contains("dark"))
		localStorage.setItem("theme", "dark");
	else localStorage.setItem("theme", "light");
}
