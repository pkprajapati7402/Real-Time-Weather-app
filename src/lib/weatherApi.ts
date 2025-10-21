const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';

if (!API_KEY) {
  console.warn('OpenWeatherMap API key is not set. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your environment variables.');
}

export async function fetchWeatherData(city: string) {
  if (!API_KEY) {
    throw new Error('API key is not configured');
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found');
    }
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}

export function getWeatherEmoji(description: string): string {
  const desc = description.toLowerCase();
  
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('thunderstorm')) return '⛈️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
  if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
  
  return '🌤️';
}

export function getWindDirection(degree: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
