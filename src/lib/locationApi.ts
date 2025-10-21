const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';

export interface LocationSuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export async function fetchLocationSuggestions(query: string): Promise<LocationSuggestion[]> {
  if (!API_KEY || query.length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.map((item: any) => ({
      name: item.name,
      country: item.country,
      state: item.state,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    return [];
  }
}

export function formatLocationDisplay(location: LocationSuggestion): string {
  if (location.state) {
    return `${location.name}, ${location.state}, ${location.country}`;
  }
  return `${location.name}, ${location.country}`;
}

export function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
