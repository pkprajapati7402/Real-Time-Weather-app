# API Documentation & Component Guide

## Weather API Integration

### `fetchWeatherData(city: string)`
Fetches real-time weather data for a specified city.

**Parameters:**
- `city` (string): City name to fetch weather for

**Returns:**
- Promise resolving to weather data object

**Example:**
```typescript
import { fetchWeatherData } from "@/lib/weatherApi";

const data = await fetchWeatherData("London");
console.log(data.main.temp); // Current temperature
```

**Weather Data Structure:**
```typescript
{
  name: string;              // City name
  main: {
    temp: number;           // Temperature in Celsius
    feels_like: number;     // Feels like temperature
    humidity: number;       // Humidity percentage
    pressure: number;       // Atmospheric pressure
  };
  weather: [{
    main: string;          // Weather type (Rain, Snow, etc)
    description: string;   // Detailed description
    icon: string;         // Icon code
  }];
  wind: {
    speed: number;        // Wind speed in m/s
    deg: number;         // Wind direction in degrees
  };
  visibility: number;     // Visibility in meters
  sys: {
    sunrise: number;      // Unix timestamp
    sunset: number;       // Unix timestamp
  };
}
```

---

## Utility Functions

### `getWeatherEmoji(description: string): string`
Returns an emoji representation of the weather.

**Mappings:**
- Cloud → ☁️
- Rain → 🌧️
- Thunderstorm → ⛈️
- Snow → ❄️
- Clear/Sunny → ☀️
- Mist/Fog → 🌫️
- Default → 🌤️

**Example:**
```typescript
import { getWeatherEmoji } from "@/lib/weatherApi";

const emoji = getWeatherEmoji("scattered clouds");
console.log(emoji); // ☁️
```

### `getWindDirection(degree: number): string`
Converts wind degree to cardinal direction.

**Returns:** N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW

**Example:**
```typescript
import { getWindDirection } from "@/lib/weatherApi";

const direction = getWindDirection(45);
console.log(direction); // "NE"
```

### `formatTime(timestamp: number): string`
Formats Unix timestamp to readable time format (12-hour format with AM/PM).

**Example:**
```typescript
import { formatTime } from "@/lib/weatherApi";

const time = formatTime(1634567890);
console.log(time); // "2:31:30 PM"
```

---

## Component Documentation

### SearchBar Component

**Props:**
```typescript
interface SearchBarProps {
  onSearch: (city: string) => void;
}
```

**Features:**
- Animated gradient border
- Real-time input handling
- Form submission handling
- Visual feedback on focus

**Usage:**
```tsx
import SearchBar from "@/components/SearchBar";

export default function Page() {
  const handleSearch = (city: string) => {
    // Handle search
  };

  return <SearchBar onSearch={handleSearch} />;
}
```

### WeatherDisplay Component

**Props:**
```typescript
interface WeatherDisplayProps {
  weather: {
    name: string;
    main: { temp: number; feels_like: number; humidity: number; pressure: number };
    weather: Array<{ main: string; description: string; icon: string }>;
    wind: { speed: number; deg: number };
    visibility: number;
    sys: { sunrise: number; sunset: number };
  };
}
```

**Features:**
- Main weather card with temperature
- Weather-specific animations
- Detailed information grid
- Responsive layout

**Usage:**
```tsx
import WeatherDisplay from "@/components/WeatherDisplay";

export default function Page() {
  return <WeatherDisplay weather={weatherData} />;
}
```

---

## Animation Classes

### Custom Tailwind Classes

#### `.animate-blob`
Animates elements with continuous blob morphing effect.
```html
<div class="animate-blob"></div>
```

#### `.animate-float`
Gentle vertical floating animation.
```html
<div class="animate-float">☀️</div>
```

#### `.animate-fade-in`
Smooth fade-in with subtle upward movement.
```html
<div class="animate-fade-in">Content</div>
```

#### `.animation-delay-2000` & `.animation-delay-4000`
Adds delay to animations for staggered effects.
```html
<div class="animate-blob animation-delay-2000"></div>
```

---

## CSS Custom Animations

All animations are defined in `src/app/globals.css`:

- `@keyframes blob` - 7s morphing animation
- `@keyframes float` - 3s vertical float
- `@keyframes fade-in` - 0.6s fade and slide
- `@keyframes fall` - 10s falling particle effect
- `@keyframes lightning-flash` - 4s lightning pulse
- `@keyframes snowfall` - 2s snowflake movement

---

## Environment Setup

### Required Environment Variables
```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key_here
```

**Why `NEXT_PUBLIC_` prefix?**
- Variables are exposed to the browser
- Required for client-side API calls
- Safe because API key is rate-limited per IP

---

## Error Handling

### API Errors Handled
- 404: City not found
- Network errors: Displayed as error message
- Missing API key: Console warning

### User Experience
- Loading state with spinner animation
- Error state with red background
- Fallback to last known weather

---

## Performance Optimization

### Features
- Client-side components for interactivity
- Efficient re-renders using React hooks
- CSS animations using GPU acceleration
- Responsive image optimization

### Best Practices
- Debounce search input (optional enhancement)
- Cache weather data (optional enhancement)
- Lazy load weather details (optional enhancement)

---

## Browser Support

- Modern browsers with ES2020+ support
- CSS Grid & Flexbox support
- CSS animations support
- Fetch API support

**Recommended browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Future Enhancement Ideas

- [ ] Multi-city comparison
- [ ] 5-day forecast
- [ ] Weather alerts
- [ ] Local storage for favorite cities
- [ ] Map integration
- [ ] Dark/Light theme toggle
- [ ] Geolocation support
- [ ] Air quality index
- [ ] UV index display
- [ ] Historical weather data

---

## Support & Issues

For issues or feature requests, please create an issue in the GitHub repository.

Happy coding! 🚀
