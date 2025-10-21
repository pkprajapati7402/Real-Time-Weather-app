"use client";

import { useState, useEffect, Suspense } from "react";
import WeatherDisplay from "@/components/WeatherDisplay";
import SearchBar from "@/components/SearchBar";
import { fetchWeatherData } from "@/lib/weatherApi";
import Image from "next/image";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
}

// Dynamic background based on weather condition
const getWeatherBackground = (weatherMain: string) => {
  const weatherMap: { [key: string]: { gradient: string; particles: string; image: string } } = {
    Clear: {
      gradient: "from-sky-400 via-blue-500 to-indigo-600",
      particles: "bg-yellow-300/20",
      image: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1920&q=80",
    },
    Clouds: {
      gradient: "from-gray-400 via-gray-500 to-slate-700",
      particles: "bg-gray-300/20",
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80",
    },
    Rain: {
      gradient: "from-slate-600 via-blue-700 to-slate-900",
      particles: "bg-cyan-400/20",
      image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1920&q=80",
    },
    Drizzle: {
      gradient: "from-slate-500 via-blue-600 to-slate-800",
      particles: "bg-cyan-300/20",
      image: "https://images.unsplash.com/photo-1428592953211-077101b2021b?w=1920&q=80",
    },
    Thunderstorm: {
      gradient: "from-gray-800 via-purple-900 to-black",
      particles: "bg-yellow-400/20",
      image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1920&q=80",
    },
    Snow: {
      gradient: "from-slate-300 via-blue-200 to-slate-400",
      particles: "bg-white/30",
      image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920&q=80",
    },
    Mist: {
      gradient: "from-gray-400 via-slate-500 to-gray-600",
      particles: "bg-gray-200/20",
      image: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&q=80",
    },
    Fog: {
      gradient: "from-gray-500 via-slate-600 to-gray-700",
      particles: "bg-gray-300/20",
      image: "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=1920&q=80",
    },
  };

  return weatherMap[weatherMain] || weatherMap.Clear;
};

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("London");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      setError(null);
      setImageLoaded(false);
      try {
        const data = await fetchWeatherData(city);
        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [city]);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  const weatherBg = weather
    ? getWeatherBackground(weather.weather[0].main)
    : { gradient: "from-slate-900 via-purple-900 to-slate-900", particles: "bg-blue-500/10", image: "" };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${weatherBg.gradient} relative overflow-hidden transition-all duration-1000`}
      suppressHydrationWarning
    >
      {/* Dynamic Weather Background Image */}
      {weatherBg.image && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-30' : 'opacity-0'}`}>
          <Image
            src={weatherBg.image}
            alt="Weather background"
            fill
            className="object-cover"
            priority
            quality={85}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 backdrop-blur-[1px] transition-all duration-1000"></div>

      {/* Animated particle elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[10%] left-[15%] w-72 h-72 ${weatherBg.particles} rounded-full blur-3xl animate-blob opacity-70`}></div>
        <div className={`absolute top-[40%] right-[20%] w-96 h-96 ${weatherBg.particles} rounded-full blur-3xl animate-blob animation-delay-2000 opacity-70`}></div>
        <div className={`absolute bottom-[15%] left-[45%] w-80 h-80 ${weatherBg.particles} rounded-full blur-3xl animate-blob animation-delay-4000 opacity-70`}></div>
      </div>

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        {/* Futuristic Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-2xl opacity-50 animate-pulse"></div>
            <h1 className="relative text-5xl sm:text-7xl font-black text-white mb-2 drop-shadow-2xl tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
                Weather
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">
                Live
              </span>
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
          <p className="text-gray-200 text-sm sm:text-lg font-light tracking-wide">
            Real-time weather intelligence at your fingertips
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Weather Content with Bento Grid Layout */}
        <div className="mt-8 sm:mt-12 w-full max-w-7xl px-2">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-full backdrop-blur-xl"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-md animate-pulse"></div>
              </div>
              <p className="text-white text-xl font-light tracking-wide">Fetching weather data...</p>
              <div className="mt-4 flex gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-red-500/10 border border-red-400/30 rounded-3xl p-8 text-center backdrop-blur-xl">
                <div className="text-5xl mb-4">⚠️</div>
                <p className="text-red-200 text-lg font-light">{error}</p>
              </div>
            </div>
          )}

          {weather && !loading && <WeatherDisplay weather={weather} />}
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-16 sm:mt-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400/50"></div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"></div>
          </div>
          <p className="text-gray-300/80 text-xs sm:text-sm font-light tracking-wider">
            Powered by <span className="text-cyan-400 font-medium">OpenWeatherMap API</span>
          </p>
          <p className="mt-2 text-gray-400/60 text-xs">
            Get your free API key at{" "}
            <span className="text-blue-400 hover:text-blue-300 transition-colors">openweathermap.org</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
