# Learning Platform

A comprehensive, production-ready learning platform teaching **Server & Networking** and **Web Game Development** from beginner to advanced levels.

## 🎯 Features

- **24 Structured Lessons** across two learning tracks
- **Interactive Quizzes** with instant feedback and explanations
- **Progress Tracking** with streaks, completion percentage, and export/import
- **Practice Templates** - Ready-to-use starter projects for hands-on learning
- **Mini Projects** - Guided projects for each lesson
- **Resource Library** - Curated external links and documentation
- **Search Functionality** - Find lessons and topics quickly
- **Dark Mode** - Full dark mode support
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown with syntax highlighting
- **Testing**: Vitest
- **Search**: Fuse.js
- **Build Tool**: Vite (for practice starters)

## 📚 Learning Tracks

### Track 1: Server & Networking
Master the fundamentals of hosting, security, and maintaining production servers.

**Modules:**
1. **Hosting Your Local Machine Publicly** - Learn to host servers on your LAN and expose them to the internet
2. **Server Security Fundamentals** - Protect your server with reverse proxies, HTTPS, and firewalls
3. **Server Maintenance & Monitoring** - Keep your server healthy with SSH hardening, monitoring, and backups
4. **Deployment & Operations** - Deploy applications with confidence using modern DevOps practices

### Track 2: Web Game Development
Build interactive web games from scratch using Canvas API and modern JavaScript.

**Modules:**
1. **Canvas Fundamentals** - Master the Canvas API, game loops, and asset management
2. **Game Mechanics** - Implement input handling, collision detection, and physics
3. **Game Architecture & Optimization** - Build scalable games with proper state management
4. **Multiplayer & Deployment** - Create real-time multiplayer games and deploy them

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/learning-platform.git
cd learning-platform

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
learning-platform/
├── src/
│   ├── app/                    # Next.js pages (App Router)
│   │   ├── page.tsx            # Home page
│   │   ├── search/             # Search functionality
│   │   ├── practice/           # Practice templates listing
│   │   ├── progress/           # Progress dashboard
│   │   └── tracks/             # Track and lesson pages
│   ├── components/             # React components
│   │   ├── LessonViewer.tsx    # Main lesson display
│   │   └── QuizComponent.tsx   # Quiz engine
│   ├── lib/                    # Utilities
│   │   ├── content.ts          # Content loading functions
│   │   └── progress.ts         # Progress tracking store
│   └── types/                  # TypeScript definitions
├── content/                    # Lesson content (JSON)
│   ├── tracks.json
│   ├── server-networking/
│   └── web-game-dev/
├── practice/                   # Practice starter templates
│   ├── server-starters/
│   └── game-starters/
└── public/                     # Static assets
```

## ✍️ Adding New Lessons

### 1. Create Lesson JSON

Add a new JSON file in the appropriate module directory:

```json
{
  "id": "your-lesson-id",
  "title": "Your Lesson Title",
  "description": "Brief description",
  "objectives": ["Learn X", "Understand Y"],
  "prerequisites": ["previous-lesson-id"],
  "estimatedTime": 45,
  "sections": [
    {
      "title": "Introduction",
      "content": "# Markdown content here\n\nYour lesson content..."
    }
  ],
  "resources": [
    {
      "title": "Documentation",
      "url": "https://example.com",
      "type": "documentation"
    }
  ],
  "miniProject": {
    "title": "Build Something",
    "description": "Project description",
    "steps": ["Step 1", "Step 2"],
    "hints": ["Hint 1"],
    "solution": "Solution explanation"
  },
  "quiz": {
    "passingScore": 70,
    "questions": [
      {
        "id": "q1",
        "type": "single",
        "question": "What is X?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "explanation": "Explanation here",
        "points": 10
      }
    ]
  },
  "environmentSetup": {
    "tools": ["Tool 1", "Tool 2"],
    "steps": ["Install X", "Configure Y"],
    "troubleshooting": ["Common issue 1: Solution"]
  }
}
```

### 2. Update Module's `modules.json`

Add your lesson to the module's lesson list:

```json
{
  "modules": [
    {
      "id": "01-module-id",
      "lessons": ["existing-lesson", "your-lesson-id"]
    }
  ]
}
```

### 3. Test Your Lesson

Run the dev server and navigate to your lesson to verify everything displays correctly.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🎨 Customization

### Theme Colors

Edit [tailwind.config.ts](tailwind.config.ts) to customize the color scheme:

```typescript
extend: {
  colors: {
    primary: {
      50: '#eff6ff',
      // ... your colors
    }
  }
}
```

### Adding Practice Starters

1. Create a new directory in `/practice/server-starters/` or `/practice/game-starters/`
2. Add a `package.json`, `README.md`, and starter code
3. Update [src/app/practice/page.tsx](src/app/practice/page.tsx) to include the new starter

## 📈 Progress Tracking

Progress is stored locally in the browser using LocalStorage. Users can:
- ✓ Mark lessons as complete
- 📚 Bookmark lessons for later
- 📊 Track quiz scores
- 🔥 Build learning streaks
- 💾 Export/import progress data

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t learning-platform .

# Run container
docker run -p 3000:3000 learning-platform
```

### Static Export

```bash
# Build static site
npm run build

# Files will be in the `out` directory
# Deploy to any static hosting service
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for your own learning platform!

## 🙏 Acknowledgments

- Lesson content inspired by industry best practices
- Practice templates based on modern development workflows
- UI/UX following accessibility guidelines

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/learning-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/learning-platform/discussions)
- **Email**: support@example.com

---

**Built with ❤️ for learners everywhere**
