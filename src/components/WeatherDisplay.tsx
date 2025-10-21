"use client";

import { useState, useEffect } from "react";
import { getWeatherEmoji, getWindDirection, formatTime } from "@/lib/weatherApi";

interface WeatherDisplayProps {
  weather: {
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
  };
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  const { main, weather: weatherConditions, wind, visibility, sys, name } = weather;
  const currentWeather = weatherConditions[0];
  const weatherEmoji = getWeatherEmoji(currentWeather.description);
  const windDirection = getWindDirection(wind.deg);
  const sunriseTime = formatTime(sys.sunrise);
  const sunsetTime = formatTime(sys.sunset);

  // Live clock state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time for digital display
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';

  // Determine animation class based on weather
  const isRainy = currentWeather.main.includes("Rain");
  const isSnowy = currentWeather.main.includes("Snow");
  const isStormy = currentWeather.main.includes("Thunderstorm");

  return (
    <div className="w-full">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Main Temperature Card - Large Featured Card */}
        <div className="md:col-span-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-[2rem] blur-3xl group-hover:blur-[4rem] transition-all duration-700 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 sm:p-12 overflow-hidden shadow-2xl min-h-[400px] flex flex-col justify-between">
            
            {/* Weather-specific effects */}
            {isRainy && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse opacity-50"></div>
              </div>
            )}
            {isSnowy && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="animate-snowfall space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1 w-1 bg-white rounded-full opacity-60 animate-fall"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
            {isStormy && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="animate-lightning space-y-8">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-0.5 w-full bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-0 animate-lightning-flash"
                      style={{ animationDelay: `${i * 1.5}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Futuristic corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-purple-400/50 rounded-br-3xl"></div>
            
            <div className="relative z-10">
              {/* Location Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                    {name}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-gray-200/80 text-sm sm:text-base font-light mb-3">
                  <span>📅</span>
                  <p>
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                
                {/* Digital Clock Display */}
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-black/40 via-black/30 to-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-cyan-400/30 shadow-lg hover:shadow-cyan-400/20 transition-all duration-300">
                  <div className="flex items-center gap-1">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 tabular-nums clock-digit drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                      {hours}
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold text-cyan-400 animate-pulse">:</span>
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 tabular-nums clock-digit drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                      {minutes}
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold text-cyan-400 animate-pulse">:</span>
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-cyan-400 tabular-nums clock-digit drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                      {seconds}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-purple-400 leading-none">{ampm}</span>
                    <div className="w-1 h-1 rounded-full bg-purple-400 mt-1 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Main Temperature Display */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-7xl sm:text-8xl font-black text-white mb-2 drop-shadow-2xl">
                    {Math.round(main.temp)}
                    <span className="text-4xl sm:text-5xl text-cyan-400">°C</span>
                  </div>
                  <p className="text-xl sm:text-2xl text-white/90 capitalize mb-3 font-light tracking-wide">
                    {currentWeather.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                    <span className="text-sm text-gray-200">Feels like</span>
                    <span className="text-lg font-semibold text-cyan-300">{Math.round(main.feels_like)}°C</span>
                  </div>
                </div>
                
                {/* Large Emoji */}
                <div className="relative hidden sm:block">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 blur-3xl opacity-40 animate-pulse"></div>
                  <div className="relative text-8xl sm:text-9xl animate-float drop-shadow-2xl">
                    {weatherEmoji}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sun Times Card - Vertical Card */}
        <div className="md:col-span-4 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl h-full flex flex-col justify-between min-h-[400px]">
            <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-yellow-400/30 rounded-tr-2xl"></div>
            
            {/* Sunrise */}
            <div className="text-center animate-fade-in">
              <div className="text-6xl mb-4 animate-float">🌅</div>
              <p className="text-sm text-gray-200/70 uppercase tracking-wider mb-2">Sunrise</p>
              <p className="text-3xl font-bold text-white">{sunriseTime}</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-4"></div>

            {/* Sunset */}
            <div className="text-center animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="text-6xl mb-4 animate-float" style={{ animationDelay: "0.5s" }}>🌇</div>
              <p className="text-sm text-gray-200/70 uppercase tracking-wider mb-2">Sunset</p>
              <p className="text-3xl font-bold text-white">{sunsetTime}</p>
            </div>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="md:col-span-3">
          <BentoCard
            icon="💧"
            label="Humidity"
            value={`${main.humidity}%`}
            delay="0"
            size="medium"
          />
        </div>

        {/* Wind Card */}
        <div className="md:col-span-3">
          <BentoCard
            icon="💨"
            label="Wind Speed"
            value={`${Math.round(wind.speed)} m/s`}
            description={windDirection}
            delay="100"
            size="medium"
          />
        </div>

        {/* Pressure Card */}
        <div className="md:col-span-3">
          <BentoCard
            icon="🌡️"
            label="Pressure"
            value={`${main.pressure}`}
            description="hPa"
            delay="200"
            size="medium"
          />
        </div>

        {/* Visibility Card */}
        <div className="md:col-span-3">
          <BentoCard
            icon="👁️"
            label="Visibility"
            value={`${(visibility / 1000).toFixed(1)}`}
            description="kilometers"
            delay="300"
            size="medium"
          />
        </div>
      </div>
    </div>
  );
}

interface DetailCardProps {
  icon: string;
  label: string;
  value: string;
  description?: string;
  delay: string;
}

function DetailCard({ icon, label, value, description, delay }: DetailCardProps) {
  return (
    <div
      className="relative group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
      {/* Card content */}
      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl">
        {/* Corner accent */}
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-xl"></div>
        
        {/* Icon with glow */}
        <div className="relative mb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative text-4xl sm:text-5xl transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        {/* Label */}
        <p className="text-xs sm:text-sm text-gray-200/70 font-light tracking-wide mb-2 uppercase">
          {label}
        </p>
        
        {/* Value */}
        <p className="text-base sm:text-xl font-bold text-white drop-shadow-lg">
          {value}
        </p>
        
        {/* Description */}
        {description && (
          <p className="text-xs text-cyan-300/80 mt-2 font-medium">{description}</p>
        )}
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}

interface BentoCardProps {
  icon: string;
  label: string;
  value: string;
  description?: string;
  delay: string;
  size?: "small" | "medium" | "large";
}

function BentoCard({ icon, label, value, description, delay, size = "medium" }: BentoCardProps) {
  const heightClass = size === "large" ? "min-h-[300px]" : size === "medium" ? "min-h-[200px]" : "min-h-[150px]";
  
  return (
    <div
      className={`relative group animate-fade-in ${heightClass}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
      {/* Card content */}
      <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 shadow-xl hover:shadow-2xl flex flex-col justify-center">
        {/* Corner accent */}
        <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-2xl"></div>
        
        {/* Icon with glow */}
        <div className="relative mb-4 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <div className="relative text-5xl sm:text-6xl transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        {/* Label */}
        <p className="text-sm sm:text-base text-gray-200/70 font-light tracking-wider mb-3 uppercase text-center">
          {label}
        </p>
        
        {/* Value */}
        <p className="text-2xl sm:text-4xl font-black text-white drop-shadow-lg text-center">
          {value}
        </p>
        
        {/* Description */}
        {description && (
          <p className="text-sm text-cyan-300/80 mt-3 font-medium text-center">{description}</p>
        )}
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
      </div>
    </div>
  );
}
