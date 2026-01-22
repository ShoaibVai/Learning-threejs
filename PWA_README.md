# PWA Implementation

This application is configured as a Progressive Web App (PWA), providing enhanced features for users.

## Features

### 🚀 Installable
- Users can install the app on their devices (desktop, mobile, tablet)
- Works like a native app with its own window
- Appears in app drawer/start menu

### 📱 Offline Support
- Service worker caches static assets
- App shell loads even without internet
- Custom offline page for better UX
- Background sync when connection restored

### ⚡ Performance
- Smart caching strategies for different asset types
- Stale-while-revalidate for optimal speed
- Network-first for API calls
- Cache-first for fonts and static resources

### 🎯 App Shortcuts
- Quick access to Search, Practice, and Progress pages
- Available from app icon context menu

## Configuration Files

### `/public/manifest.json`
Defines app metadata, icons, theme colors, and shortcuts.

### `/next.config.js`
PWA configuration with workbox caching strategies:
- **CacheFirst**: Google Fonts (1 year cache)
- **StaleWhileRevalidate**: Images, CSS, JS (24 hours)
- **NetworkFirst**: API calls, dynamic content (10s timeout)

### `/src/components/PWAInstallPrompt.tsx`
Custom install prompt component that appears for eligible users.

## Development

PWA features are **disabled in development mode** to avoid caching issues.

```bash
npm run dev    # PWA disabled
npm run build  # PWA enabled
npm run start  # Test PWA in production mode
```

## Testing PWA

1. **Build the production version:**
   ```bash
   npm run build
   npm run start
   ```

2. **Open Chrome DevTools:**
   - Application tab → Service Workers
   - Application tab → Manifest
   - Lighthouse tab → Run PWA audit

3. **Test installation:**
   - Chrome/Edge: Install button in address bar
   - Mobile: "Add to Home Screen" prompt

4. **Test offline mode:**
   - DevTools → Network tab → Offline checkbox
   - Navigate app to test cached pages

## Caching Strategies

### Cache First (Long-term static assets)
- Google Fonts
- Rarely changing assets
- 1 year expiration

### Stale While Revalidate (Frequently updated)
- Images, CSS, JavaScript
- Serves cached version immediately
- Updates cache in background
- 24 hour expiration

### Network First (Dynamic content)
- API calls
- Next.js data
- Falls back to cache if offline
- 10 second timeout

## Icons

Replace placeholder icons with branded versions:
- `/public/icon-192.svg` - Small icon (192x192)
- `/public/icon-512.svg` - Large icon (512x512)

Recommended tools:
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

## Manifest Customization

Edit `/public/manifest.json` to customize:
- `name`: Full app name
- `short_name`: Name shown on home screen
- `theme_color`: Browser UI color
- `background_color`: Splash screen background
- `shortcuts`: Quick action menu items

## Browser Support

- ✅ Chrome/Edge (full support)
- ✅ Safari (iOS 16.4+, limited)
- ✅ Firefox (desktop only)
- ✅ Samsung Internet
- ⚠️ Safari (older versions have limited PWA support)

## Deployment Notes

### Netlify
PWA works automatically. Ensure `_headers` file includes:
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
```

### Vercel
PWA works automatically with zero configuration.

### Custom Server
Ensure:
- HTTPS is enabled (required for service workers)
- Proper MIME types for manifest.json and service worker files
- Cache headers configured appropriately

## Troubleshooting

### Service Worker not registering
- Check browser console for errors
- Ensure HTTPS (or localhost for dev)
- Clear browser cache and hard reload

### Install prompt not showing
- Some browsers suppress frequent prompts
- Check `localStorage` for 'pwa-install-dismissed'
- User must engage with site first (PWA criteria)

### Outdated cache
- Service workers update automatically
- Force update: DevTools → Application → Service Workers → Update
- Users get new version on next visit

## Best Practices

1. **Always test production build locally** before deploying
2. **Version your cache names** when making major changes
3. **Keep service worker simple** - complex logic can cause issues
4. **Monitor cache size** - don't cache everything
5. **Test offline scenarios** thoroughly
6. **Provide feedback** when actions require network

## Resources

- [PWA Builder](https://www.pwabuilder.com/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [Next.js PWA Example](https://github.com/shadowwalker/next-pwa)
- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
