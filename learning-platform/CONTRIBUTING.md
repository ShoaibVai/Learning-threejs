# Contributing to Learning Platform

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 🎯 Ways to Contribute

- 📚 Add new lessons or improve existing content
- 🐛 Report bugs or issues
- ✨ Suggest new features
- 🔧 Fix bugs or implement features
- 📖 Improve documentation
- 🎨 Enhance UI/UX

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/learning-platform.git
   cd learning-platform
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Adding New Lessons

### 1. Create Lesson Content

Create a new JSON file in the appropriate module directory:

**Path**: `/content/{track-id}/{module-id}/{lesson-id}.json`

**Template**:
```json
{
  "id": "unique-lesson-id",
  "title": "Lesson Title",
  "description": "Brief description (1-2 sentences)",
  "objectives": [
    "Objective 1",
    "Objective 2"
  ],
  "prerequisites": ["previous-lesson-id"],
  "estimatedTime": 30,
  "sections": [
    {
      "title": "Section Title",
      "content": "# Markdown Content\n\nUse markdown formatting..."
    }
  ],
  "resources": [
    {
      "title": "Resource Title",
      "url": "https://example.com",
      "type": "documentation"
    }
  ],
  "miniProject": {
    "title": "Project Title",
    "description": "What to build",
    "steps": ["Step 1", "Step 2"],
    "hints": ["Helpful hint"],
    "solution": "Explanation of solution"
  },
  "quiz": {
    "passingScore": 70,
    "questions": [
      {
        "id": "q1",
        "type": "single",
        "question": "Question text?",
        "options": ["Option A", "Option B", "Option C"],
        "correctAnswer": "Option A",
        "explanation": "Why this is correct",
        "points": 10
      }
    ]
  },
  "environmentSetup": {
    "tools": ["Required Tool 1"],
    "steps": ["Install X", "Configure Y"],
    "troubleshooting": ["Issue: Solution"]
  }
}
```

### 2. Update Module Configuration

Add your lesson ID to the module's lesson list in `/content/{track-id}/modules.json`:

```json
{
  "modules": [
    {
      "id": "module-id",
      "title": "Module Title",
      "description": "Module description",
      "lessons": [
        "existing-lesson",
        "your-new-lesson"
      ]
    }
  ]
}
```

### 3. Test Your Lesson

1. Start the dev server: `npm run dev`
2. Navigate to your lesson
3. Verify all sections display correctly
4. Test quiz functionality
5. Check environment setup instructions

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Writing Tests

Place tests in `src/__tests__/` directory:

```typescript
import { describe, it, expect } from 'vitest'

describe('YourFeature', () => {
  it('should do something', () => {
    expect(true).toBe(true)
  })
})
```

## 🎨 Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check formatting
npm run format:check

# Fix formatting
npm run format

# Run linter
npm run lint
```

### Guidelines

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused

## 📊 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**: `npm test`
4. **Run linter**: `npm run lint`
5. **Build successfully**: `npm run build`
6. **Write clear PR description**:
   - What changes were made
   - Why the changes were needed
   - How to test the changes

### PR Title Format

- `feat: Add new feature`
- `fix: Fix bug in component`
- `docs: Update documentation`
- `style: Format code`
- `refactor: Refactor component`
- `test: Add tests`
- `chore: Update dependencies`

## 🐛 Bug Reports

When filing a bug report, include:

1. **Description**: What happened?
2. **Expected behavior**: What should happen?
3. **Steps to reproduce**: How to trigger the bug?
4. **Environment**: Browser, OS, Node version
5. **Screenshots**: If applicable

## 💡 Feature Requests

For feature requests, describe:

1. **Problem**: What problem does this solve?
2. **Solution**: How should it work?
3. **Alternatives**: Other approaches considered?
4. **Additional context**: Mockups, examples, etc.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be added to the README and release notes!

## ❓ Questions?

- Open an issue for questions
- Join our discussions
- Email: contribute@example.com

Thank you for contributing! 🎉
