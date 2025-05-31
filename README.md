# 🌤️ Weather App

## A beautiful and responsive Weather App built with **React.js** and **Tailwind CSS**, using **Lucide React** for icons and **Recharts** for visualizing weather trends. The app fetches real-time weather data from [WeatherAPI](https://www.weatherapi.com/).

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Display temperature, condition, humidity, and wind speed
- 📊 Visualize hourly or daily temperature trends using Recharts
- 🕒 Display local time of searched location
- 🖼️ Clean and modern UI with Tailwind CSS
- 💡 Iconography powered by Lucide React

---

## 🧪 Tech Stack

- ⚛️ **React.js** – JavaScript UI library
- 🎨 **Tailwind CSS** – Utility-first CSS framework
- 🌐 **Fetch API** – To call WeatherAPI
- 🌤️ **WeatherAPI** – [Free Weather API via weatherapi](https://www.weatherapi.com/)
- 📊 **Recharts** – For data visualization
- 🧩 **Lucide React** – Icon library

---

## 📁 Folder Structure

```bash
src/
├── assets/
├── components/
│   ├── Analytics.tsx
│   ├── Forecast.tsx
│   ├── Graph.tsx
│   ├── Header.tsx
│   ├── HourlyReadings.tsx
│   ├── LeftSide.tsx
│   ├── RightSide.tsx
│   └── WeatherRecommendation.tsx
├── constants/
│   └── api.constants.tsx
├── Context/
│   ├── context.tsx
│   └── context.provider.tsx
├── interfaces/
│   ├── context.interface.ts
│   ├── weather.interface.ts
│   └── WeatherForecast.interface.ts
├── styles/
│   └── global/
│     ├── fonts.css
│     └── index.css
├── utils/
│     ├── analytics.ts
│     ├── toggleTheme.ts
│     └── weatherRecommendation.tsx
├── App.tsx
└── main.tsx
```

---

## 🔧 Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/Mahmoud46/weather-app.git
cd weather-app
```

2. Install dependencies

```bash
npm install
```

3. Add weatherapi API key to `.env` file<br/>
   You can generate a key from [weatherapi](https://www.weatherapi.com/).

```env
VITE_API_KEY = your_weatherap_api_key_here
```

4. Start the development server

```bash
npm run dev
```
