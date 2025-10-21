# WeatherLive - Real-Time Weather Web App

A modern, beautiful real-time weather application built with Next.js and OpenWeatherMap API. Features a stunning UI with animations and weather-specific visual effects.

## ✨ Features

- 🌡️ **Real-time Weather Data** - Get current weather conditions for any city
- 🎨 **Modern Design** - Beautiful gradient UI with glassmorphism effects
- ✨ **Weather Animations** - Dynamic animations that change based on weather conditions
  - ☔ Rain effects for rainy weather
  - ❄️ Snowfall animations for snow
  - ⚡ Lightning effects for thunderstorms
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔍 **City Search** - Search for weather in any city worldwide
- 📊 **Detailed Weather Info** - Humidity, pressure, wind speed, visibility, sunrise/sunset times

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key (free)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/pkprajapati7402/Real-Time-Weather-app.git
   cd Real-Time-Weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your OpenWeatherMap API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the API section

4. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your OpenWeatherMap API key:
     ```bash
     NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
     ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Technology Stack

- **Framework**: Next.js 15+
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **API**: OpenWeatherMap REST API
- **Animations**: CSS animations & Tailwind animation utilities

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page component
│   ├── layout.tsx        # Layout component
│   └── globals.css       # Global styles & custom animations
├── components/
│   ├── SearchBar.tsx     # City search component
│   └── WeatherDisplay.tsx # Weather information display
└── lib/
    └── weatherApi.ts     # Weather API utilities
```

## 🎯 Key Components

### SearchBar
- City search functionality
- Animated gradient border
- Real-time search input

### WeatherDisplay
- Main weather card with temperature
- Weather-specific animations
- Detailed information grid (humidity, pressure, wind, visibility, etc.)
- Sunrise/sunset times

### Weather API Integration
- Fetch weather data from OpenWeatherMap
- Error handling
- Weather emoji mapping
- Time formatting utilities

## 🎨 Animations

The app includes several weather-specific animations:

- **Blob Animation**: Background gradient blobs that animate continuously
- **Float Animation**: Temperature emoji gently floats up and down
- **Rain Effect**: Cyan gradient pulse for rainy weather
- **Snow Effect**: Snowflake particles falling down the screen
- **Lightning Effect**: Yellow flashes simulating thunderstorms
- **Fade-in**: Smooth entrance animations for content

## 📦 Build & Deploy

### Build
```bash
npm run build
```

### Deploy on Vercel
```bash
vercel deploy
```

Or push to GitHub and connect to Vercel for automatic deployments.

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📧 Contact

For questions or suggestions, please feel free to reach out!

---

**Made with ❤️ by [Your Name]**
