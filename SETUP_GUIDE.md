# WeatherLive Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Get OpenWeatherMap API Key
1. Visit: https://openweathermap.org/api
2. Sign up for a free account
3. Navigate to API keys section
4. Copy your API key

### 3. Configure Environment
Create `.env.local` in the root directory and add:
```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser

---

## Features Implemented

### 🎨 UI/UX Design
- **Modern Dark Theme**: Gradient backgrounds with purple, blue, and cyan tones
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Smooth Transitions**: Hover effects and transitions throughout

### ✨ Animations
- **Animated Background**: Floating gradient blobs
- **Weather Emoji Float**: Main temperature emoji gently bounces
- **Fade-in Effects**: Smooth entrance animations for content

### 🌦️ Weather-Specific Effects
- **Rain**: Cyan gradient pulse effect
- **Snow**: Animated snowflake particles falling
- **Thunderstorm**: Lightning flash effects

### 🔍 Search Functionality
- Search for any city worldwide
- Animated search bar with gradient border
- Real-time data fetching

### 📊 Weather Information Display
- Current temperature
- Feels-like temperature
- Weather condition description
- Humidity percentage
- Atmospheric pressure
- Wind speed and direction
- Visibility distance
- Sunrise and sunset times

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page (client component)
│   ├── layout.tsx            # App layout
│   └── globals.css           # Global styles & animations
├── components/
│   ├── SearchBar.tsx         # City search input with animations
│   └── WeatherDisplay.tsx    # Weather info display with cards
└── lib/
    └── weatherApi.ts         # API integration & utilities

Root files:
├── .env.local               # Environment variables (create this)
├── .env.example             # Environment template
├── package.json             # Dependencies
├── next.config.ts          # Next.js config
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind CSS config
└── README.md               # Documentation
```

---

## Key Technologies

- **Next.js 15**: React framework with server capabilities
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **OpenWeatherMap API**: Real-time weather data
- **CSS Animations**: Custom keyframe animations

---

## Customization Tips

### Change Colors
Edit `globals.css` animation colors:
```css
background-to-r from-blue-400 via-cyan-400 to-purple-400
```

### Adjust Animation Speed
Modify animation duration in `globals.css`:
```css
animation: blob 7s infinite;  /* Change 7s to your preferred speed */
```

### Add More Weather Details
Update `WeatherDisplay.tsx` `DetailCard` component to show additional weather metrics.

---

## Troubleshooting

### API Key Not Working
- Ensure the key is correctly copied from OpenWeatherMap
- Check that `.env.local` is in the root directory (not in subdirectories)
- Restart the development server after adding the key

### City Not Found
- Check spelling of city name
- Try using city code (e.g., "London, UK")
- Ensure internet connection is stable

### Animations Not Showing
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild the project: `npm run dev`
- Check if Tailwind CSS is properly configured

---

## Production Build

```bash
npm run build
npm run start
```

---

## Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variable: `NEXT_PUBLIC_OPENWEATHER_API_KEY`
4. Deploy

### Deploy to Other Platforms
Ensure your hosting platform supports:
- Node.js 18+
- Environment variable configuration
- HTTPS (required for API calls)

---

## License

MIT License - feel free to use this project for personal and commercial purposes.

---

Enjoy your weather app! 🌤️
