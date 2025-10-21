"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-2xl transition-all duration-500 ${
        isActive ? "scale-105" : "scale-100"
      }`}
    >
      <div className="relative group">
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
        
        {/* Futuristic border animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
        
        {/* Main search container */}
        <div className="relative px-6 py-4 bg-gradient-to-br from-white/15 to-white/5 rounded-full flex items-center gap-4 backdrop-blur-2xl border-2 border-white/30 shadow-2xl">
          {/* Search icon with glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-md opacity-50"></div>
            <svg
              className="relative w-6 h-6 text-cyan-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {/* Input field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            placeholder="Search for a city..."
            className="flex-1 bg-transparent text-white placeholder-gray-300/70 outline-none text-base sm:text-lg font-light tracking-wide"
            suppressHydrationWarning
          />
          
          {/* Search button with enhanced design */}
          <button
            type="submit"
            className="relative px-6 py-2.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-2xl overflow-hidden group/btn"
            suppressHydrationWarning
          >
            {/* Button shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative z-10 flex items-center gap-2">
              <span>Search</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
