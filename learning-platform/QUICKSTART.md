# Quick Start Guide

Get up and running with the Learning Platform in 5 minutes!

## 📋 Prerequisites

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- Code editor (VS Code recommended)

## ⚡ Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/learning-platform.git
cd learning-platform

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🎓 First Steps

### 1. Browse Learning Tracks
- Click on a track card on the home page
- View available modules and lessons

### 2. Start Your First Lesson
- Click on any lesson
- Read objectives and content
- Complete mini-projects
- Take quizzes

### 3. Track Your Progress
- Mark lessons complete using the button
- View your progress dashboard
- Build learning streaks

### 4. Try Practice Starters
- Go to "Practice" in the navigation
- Download a starter template
- Follow setup instructions
- Start coding!

## 🧪 Testing Practice Starters

### Express Server Starter

```bash
cd practice/server-starters/express-basic
npm install
npm start
# Visit http://localhost:3000
```

### Canvas Game Starter

```bash
cd practice/game-starters/canvas-vite-ts
npm install
npm run dev
# Visit http://localhost:5173
```

### WebSocket Multiplayer

```bash
cd practice/game-starters/websocket-multiplayer-basic/server
npm install
npm start
# Server runs on ws://localhost:8080
```

## 🎯 Learning Path Recommendations

### For Absolute Beginners
Start with **Server & Networking** → **Module 1: Hosting Basics**

### For Game Development Beginners
Start with **Web Game Dev** → **Module 1: Canvas Fundamentals**

### For Experienced Developers
Jump to any module that interests you - prerequisites are listed in each lesson

## 🚀 Pro Tips

1. **Complete lessons in order** - Each builds on previous concepts
2. **Do the mini-projects** - Hands-on practice is key
3. **Aim for quiz passing scores** - 70%+ shows mastery
4. **Use practice starters** - They provide pre-configured environments
5. **Export your progress** - Back up your learning data regularly

## 📱 Mobile Usage

The platform is fully responsive! You can:
- ✓ Read lessons on mobile
- ✓ Take quizzes on tablets
- ⚠️ Practice coding requires desktop (use practice starters)

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Check Node version
node --version  # Should be 18+

# Update dependencies
npm update

# Clean build
npm run build
```

## 🎨 Customization

### Change Theme Colors

Edit [tailwind.config.ts](tailwind.config.ts):

```typescript
colors: {
  primary: {
    600: '#your-color', // Main color
    // ... other shades
  }
}
```

### Add Your Own Lessons

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions on adding content.

## 📚 Next Steps

- [ ] Complete your first lesson
- [ ] Take your first quiz
- [ ] Try a practice starter
- [ ] Explore both learning tracks
- [ ] Build a streak!

## 💡 Need Help?

- Check the [full README](README.md) for comprehensive docs
- Read [CONTRIBUTING.md](CONTRIBUTING.md) for development guide
- Open an issue for bugs or questions
- Star the repo if you find it helpful! ⭐

---

**Happy Learning! 🚀**
