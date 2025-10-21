# 🌤️ WeatherLive - Quick Reference Card

## ⚡ Quick Start (3 Steps)

```bash
# 1. Install dependencies
npm install

# 2. Add API key to .env.local
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key_from_openweathermap.org

# 3. Run development server
npm run dev
```

Open **http://localhost:3000** 🎉

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview & features |
| `SETUP_GUIDE.md` | Detailed setup instructions |
| `API_DOCUMENTATION.md` | Component & function reference |
| `DEPLOYMENT_GUIDE.md` | How to deploy to production |
| `IMPLEMENTATION_SUMMARY.md` | Complete implementation details |

---

## 🗂️ File Structure

```
src/
├── app/
│   ├── page.tsx           ← Main page (search + display)
│   ├── layout.tsx         ← App layout wrapper
│   └── globals.css        ← Styles & animations
├── components/
│   ├── SearchBar.tsx      ← City search input
│   └── WeatherDisplay.tsx ← Weather info cards
└── lib/
    └── weatherApi.ts      ← API & utility functions
```

---

## 🎨 Key Features

### 🌡️ Weather Data
- Current temperature & feels-like
- Weather condition & description
- Humidity, pressure, wind
- Visibility, sunrise/sunset

### ✨ Animations
- Floating gradient blobs
- Bouncing emoji
- Rain/snow/lightning effects
- Smooth fade-in transitions

### 📱 Responsive
- Mobile, tablet, desktop
- Touch-friendly buttons
- Adaptive layouts

---

## 🔧 Commands

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Run production server
npm run lint     # Check code style
```

---

## 🌍 Deploy

### Easiest: Vercel
1. Push to GitHub
2. Import in Vercel dashboard
3. Add API key as environment variable
4. Deploy! 🚀

---

## 🔑 Required Environment Variable

```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

Get key from: **https://openweathermap.org/api**

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "API key not set" | Add to `.env.local` and restart |
| "City not found" | Check spelling, try different format |
| "Port 3000 in use" | `npm run dev -- -p 3001` |
| "Animations laggy" | Clear cache (Ctrl+Shift+Delete) |
| "Styles not loading" | Rebuild: `npm run dev` |

---

## 📊 Component Props

### SearchBar
```typescript
<SearchBar onSearch={(city: string) => void} />
```

### WeatherDisplay
```typescript
<WeatherDisplay weather={weatherData} />
```

---

## 🎯 Main Components Explained

### page.tsx
- Main entry point
- Handles state & API calls
- Renders SearchBar + WeatherDisplay

### SearchBar
- City input field
- Animated gradient border
- Triggers search on submit

### WeatherDisplay
- Temperature card with animations
- 8 info cards (humidity, pressure, etc)
- Weather-specific effects

---

## 🚀 Next Steps

1. ✅ Setup (npm install)
2. ✅ Configure API key
3. ✅ Run development server
4. ✅ Test the app
5. ✅ Deploy to Vercel
6. 🔄 Share with others!

---

## 💡 Tips & Tricks

### Search Tips
- Use city names: "London"
- Use city codes: "London, UK"
- Use zip codes: Works with most countries

### Improve Performance
- Cache API responses (optional)
- Add debounce to search (optional)
- Use React.memo for components (optional)

### Customize Look
- Edit color palette in `globals.css`
- Change animation speeds
- Modify card styles in `WeatherDisplay.tsx`

---

## 📞 API Reference

### Fetch Weather
```typescript
import { fetchWeatherData } from "@/lib/weatherApi";
const data = await fetchWeatherData("London");
```

### Get Emoji
```typescript
import { getWeatherEmoji } from "@/lib/weatherApi";
const emoji = getWeatherEmoji("scattered clouds"); // ☁️
```

### Get Wind Direction
```typescript
import { getWindDirection } from "@/lib/weatherApi";
const dir = getWindDirection(45); // "NE"
```

### Format Time
```typescript
import { formatTime } from "@/lib/weatherApi";
const time = formatTime(1634567890); // "2:31:30 PM"
```

---

## 🎓 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [OpenWeatherMap API](https://openweathermap.org/api)

---

## ✅ Pre-Launch Checklist

- [ ] Dependencies installed
- [ ] API key configured
- [ ] Search works
- [ ] Weather displays correctly
- [ ] Animations smooth
- [ ] Mobile responsive
- [ ] Error handling works
- [ ] No console errors
- [ ] Build successful

---

## 🌟 You're All Set!

Your weather app is ready to go. Start developing and have fun! 🎉

**Questions?** Check the detailed guides in the documentation files.

---

**Created with ❤️ using Next.js, TypeScript & Tailwind CSS**
