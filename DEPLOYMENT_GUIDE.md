# Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

Vercel is the easiest and fastest way to deploy your Next.js app. It's created by the Next.js team and has excellent support.

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Add WeatherLive app"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign in with GitHub account
3. Click "Add New" → "Project"
4. Select your `Real-Time-Weather-app` repository
5. Click "Import"

### Step 3: Configure Environment Variables
1. In the Vercel dashboard, go to "Settings" → "Environment Variables"
2. Add new variable:
   - **Name**: `NEXT_PUBLIC_OPENWEATHER_API_KEY`
   - **Value**: Your OpenWeatherMap API key
3. Click "Add"

### Step 4: Deploy
1. Click the "Deploy" button
2. Wait for deployment to complete
3. Your app will be live at `https://your-project.vercel.app`

---

## 🌐 Deploy to Other Platforms

### Netlify
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variable in Site Settings
5. Deploy

### Docker + Any Cloud Provider

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t weatherlive .
docker run -p 3000:3000 -e NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key weatherlive
```

### AWS Amplify
1. Connect GitHub repository
2. Set build settings (Next.js preset available)
3. Add environment variables
4. Deploy

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy (automatic)

### Heroku (Deprecated but still works)
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key
```

---

## 🔒 Environment Variable Security

### Best Practices
- Never commit `.env.local` to Git
- Use `.env.example` for reference only
- Keep API keys secure in deployment platform
- Regenerate keys if accidentally exposed
- Use different keys for dev/prod (optional)

### Rate Limiting
OpenWeatherMap free tier includes:
- 60 calls/minute
- 1M calls/month
- Suitable for most applications

For higher usage, upgrade the API plan.

---

## 📊 Monitoring & Analytics

### After Deployment
1. Set up error tracking (e.g., Sentry)
2. Monitor API usage on OpenWeatherMap dashboard
3. Track page performance
4. Set up alerts for failed API calls

### Performance Optimization
- Enable caching headers in production
- Use CDN for static assets (automatic with Vercel)
- Monitor Core Web Vitals
- Optimize images and fonts

---

## 🔄 Continuous Deployment

### Automatic Deployments
- Push to main branch = automatic production deploy
- Create PR = automatic preview deployment
- Perfect for testing before merging

### Rollback
- Vercel allows one-click rollback to previous deployments
- Access from Deployments tab in dashboard

---

## 🧪 Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] Build completes without errors: `npm run build`
- [ ] No console warnings or errors
- [ ] Environment variables configured
- [ ] API key is valid and tested
- [ ] Responsive design tested on mobile
- [ ] Search functionality works
- [ ] Animations display smoothly
- [ ] Error handling works (test with invalid city)
- [ ] Loading states appear correctly
- [ ] No TypeScript errors: `npx tsc --noEmit`

---

## 🐛 Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and rebuild locally
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for ESLint errors
npm run lint
```

### API Not Working
- Verify API key is correct
- Check that `NEXT_PUBLIC_` prefix is used
- Verify rate limits haven't been exceeded
- Check OpenWeatherMap status page

### Animations Not Working
- Clear cache: Hard refresh (Ctrl+Shift+R)
- Check browser console for CSS errors
- Verify Tailwind CSS is properly bundled

### 404 on Specific Routes
- This is normal for single-page apps
- Configure platform to rewrite all routes to index

---

## 📈 Scaling Considerations

### For Growing Traffic
1. **API Rate Limiting**: Implement server-side caching
2. **Database**: Cache weather data to reduce API calls
3. **CDN**: Use edge functions for API caching
4. **Monitoring**: Track usage and performance

### Optional Enhancements
- Add Redis for caching
- Use API gateway for rate limiting
- Implement ISR (Incremental Static Regeneration)
- Use server-side rendering for better SEO

---

## 🔐 Security Checklist

- [ ] API key not exposed in code
- [ ] Sensitive data in environment variables
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Input validation in place
- [ ] Rate limiting implemented (optional)
- [ ] Security headers configured (Vercel default)

---

## 📱 Mobile App Wrapper (Optional)

To turn this into a mobile app:
1. Use React Native or Expo
2. Or use Capacitor to wrap the web app
3. Distribution via App Store/Play Store

---

## 💾 Backup & Backup Strategy

### GitHub Backup
- Always backup code in GitHub
- Enable branch protection
- Regular commits and pushes

### Data Backup
- Weather data is temporary (no database)
- No permanent data to backup
- API data is always fresh

---

## 📝 Version Control Workflow

### Recommended Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "Add new feature"

# Push and create PR
git push origin feature/new-feature

# After review and testing
git merge feature/new-feature
git push origin main

# Clean up
git branch -d feature/new-feature
```

---

## 🆘 Support & Help

### Common Issues & Solutions

**Q: "Cannot find module '@heroicons/react'"**
A: Already fixed in the provided code (uses SVG instead)

**Q: "API key is not set"**
A: Add `NEXT_PUBLIC_OPENWEATHER_API_KEY` to `.env.local`

**Q: "Port 3000 already in use"**
A: `npm run dev -- -p 3001` (use different port)

**Q: "Animations are laggy"**
A: Use hardware acceleration in browser, check GPU usage

---

## 🎉 Successfully Deployed!

Once deployed, you can:
- Share the URL with others
- Use in production
- Monitor performance
- Gather user feedback
- Iterate and improve

---

## 📞 Next Steps

1. Deploy to Vercel (easiest option)
2. Add your OpenWeatherMap API key
3. Test all features in production
4. Monitor usage and performance
5. Gather user feedback
6. Plan future enhancements

---

Good luck with your deployment! 🚀
