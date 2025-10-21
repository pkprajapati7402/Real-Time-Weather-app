"use client";

import { useState, useEffect, useRef } from "react";
import { fetchLocationSuggestions, formatLocationDisplay, getCountryFlag, LocationSuggestion } from "@/lib/locationApi";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions when input changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      const results = await fetchLocationSuggestions(input);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [input]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    const locationName = suggestion.state 
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    onSearch(suggestion.name);
    setInput("");
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-2xl transition-all duration-500 relative z-50 ${
        isActive ? "scale-105" : "scale-100"
      }`}
    >
      <div className="relative group" ref={searchRef}>
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
            onKeyDown={handleKeyDown}
            placeholder="Search for a city..."
            className="flex-1 bg-transparent text-white placeholder-gray-300/70 outline-none text-base sm:text-lg font-light tracking-wide"
            suppressHydrationWarning
            autoComplete="off"
          />
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          )}
          
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

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-slate-900/98 to-slate-800/98 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden z-[100] animate-fade-in max-h-[400px] overflow-y-auto">
            <div className="p-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.name}-${suggestion.lat}-${suggestion.lon}`}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-200 flex items-center gap-3 group/item ${
                    selectedIndex === index
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {/* Country Flag */}
                  <span className="text-2xl">{getCountryFlag(suggestion.country)}</span>
                  
                  {/* Location Info */}
                  <div className="flex-1">
                    <p className="text-white font-medium text-base group-hover/item:text-cyan-300 transition-colors">
                      {suggestion.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                    </p>
                  </div>
                  
                  {/* Arrow icon */}
                  <svg 
                    className={`w-5 h-5 transition-all duration-200 ${
                      selectedIndex === index ? "text-cyan-400 translate-x-1" : "text-gray-500"
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
            
            {/* Hint text */}
            <div className="px-4 py-2 bg-black/20 border-t border-white/10">
              <p className="text-gray-400 text-xs text-center">
                Use ↑↓ arrow keys to navigate, Enter to select, Esc to close
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
