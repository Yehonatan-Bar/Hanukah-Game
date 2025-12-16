# Hanukkah Game - Deployment & Update Instructions

## Quick Reference for Future Sessions

### Initial Setup (First Time Only)
```bash
# Install dependencies
npm install

# Verify build works
npm run build
```

### Running Locally
```bash
# Start development server
npm run dev

# Game will be available at:
# http://localhost:3000/Hanukah-Game/
```

### Making Updates

#### 1. After Making Code Changes
```bash
# Test locally first
npm run dev

# Build to verify no errors
npm run build
```

#### 2. Commit Changes
```bash
git add .
git commit -m "Description of changes"
```

#### 3. Push to Feature Branch
```bash
# Push to your claude/* branch
git push -u origin <your-branch-name>

# Example:
# git push -u origin claude/debug-game-merge-lbESh
```

#### 4. Deploy to GitHub Pages
The game automatically deploys to GitHub Pages when changes are merged to `main` branch.

**Option A: Create Pull Request**
```bash
# Create PR to main (if gh CLI available)
gh pr create --title "Your update title" --body "Description" --base main

# Otherwise, create PR through GitHub web interface
```

**Option B: Direct Push to Main (if you have permissions)**
```bash
# Checkout main and merge
git checkout main
git merge <your-feature-branch>
git push origin main
```

### Deployment Details

- **Deployment Method**: GitHub Actions (automatic)
- **Trigger**: Push to `main` branch
- **Workflow File**: `.github/workflows/deploy.yml`
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Expected URL**: `https://yehonatan-bar.github.io/Hanukah-Game/`

### Troubleshooting

#### Game Not Loading After Deployment
1. Check GitHub Actions tab for deployment status
2. Verify `vite.config.js` has correct base path: `base: '/Hanukah-Game/'`
3. Ensure dist folder contains `index.html` and `assets/` directory
4. Check browser console for errors

#### Local Development Issues
```bash
# If dependencies are missing
npm install

# If build fails
rm -rf node_modules package-lock.json
npm install
npm run build

# If port 3000 is in use
# Edit vite.config.js and change server.port
```

#### Build Warnings
- Phaser library is large (>500KB) - this is normal
- CJS deprecation warning - can be ignored for now
- To optimize: consider lazy loading or code splitting

### File Structure
```
Hanukah-Game/
├── .github/workflows/deploy.yml  # Auto-deployment configuration
├── src/
│   ├── main.js                   # Game entry point
│   ├── scenes/                   # Game scenes
│   ├── entities/                 # Game objects (Hero, Donut)
│   ├── managers/                 # Game managers
│   └── ui/                       # UI components
├── index.html                     # Main HTML file
├── vite.config.js                # Vite build configuration
├── package.json                  # Dependencies
└── README.md                     # Project documentation
```

### Important Notes

1. **Never commit `node_modules/`** - It's in `.gitignore`
2. **Never commit `dist/`** - Built automatically by GitHub Actions
3. **Always run `npm install`** after cloning or pulling
4. **Test locally before pushing** to avoid breaking production
5. **Base path in vite.config.js** must match repository name for GitHub Pages

### Common Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Git Operations
git status           # Check current state
git branch           # List branches
git checkout -b name # Create new branch
git push -u origin   # Push and set upstream

# Useful Checks
npm list phaser      # Verify Phaser is installed
ls -la dist/         # Check build output
git log --oneline    # View commit history
```

### Contact & Resources

- **Phaser Documentation**: https://photonstorm.github.io/phaser3-docs/
- **Vite Documentation**: https://vitejs.dev/
- **GitHub Pages Docs**: https://docs.github.com/en/pages

---

**Last Updated**: 2025-12-16
**Game Version**: 1.0.0
