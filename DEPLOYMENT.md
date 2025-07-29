# 🚀 GitHub Pages Deployment Guide

> **Complete guide to deploy the Random Movie Picker to GitHub Pages**

This guide will walk you through deploying your Movie Picker application to GitHub Pages for free hosting and sharing.

---

## 📋 Prerequisites

Before starting, ensure you have:

1. **Node.js and npm installed**
   ```bash
   node --version  # v20.19.0 or higher
   npm --version   # 10.2.4 or higher
   ```

2. **Git installed**
   ```bash
   git --version  # 2.29.1 or higher
   ```

3. **GitHub account** with repository access

4. **TMDb API Key** - Get one free from [The Movie Database](https://www.themoviedb.org/settings/api)

---

## 🎯 Deployment Overview

GitHub Pages deployment involves:
- Installing the `gh-pages` package
- Configuring build settings
- Setting up deployment scripts
- Configuring GitHub Pages settings
- Pushing your code

---

## 📦 Step 1: Install gh-pages

Install the GitHub Pages deployment package:

```bash
npm install --save-dev gh-pages
```

This package will handle the deployment process automatically.

---

## ⚙️ Step 2: Configure package.json

### Add Homepage Property

Open `package.json` and add the `homepage` property:

```json
{
  "name": "movie-picker",
  "version": "0.0.0",
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME",
  "private": true,
  // ... rest of your package.json
}
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPOSITORY_NAME` with your repository name

**Example:**
```json
"homepage": "https://johndoe.github.io/movie-picker"
```

### Add Deployment Scripts

Add deployment scripts to the `scripts` section:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}
```

**Key scripts:**
- `predeploy`: Builds the application before deployment
- `deploy`: Pushes the built files to GitHub Pages

---

## 🌐 Step 3: Configure Environment Variables

Since GitHub Pages is a static hosting service, you need to handle environment variables carefully.

### Option A: Public Environment Variables

For public repositories, you can include non-sensitive variables directly:

```bash
# Create .env.production
echo "VITE_TMDB_BASE_URL=https://api.themoviedb.org/3" > .env.production
echo "VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500" >> .env.production
```

### Option B: Build-time Variables

For sensitive variables like API keys, consider using GitHub Secrets (requires GitHub Actions setup).

**Simple approach for demo purposes:**
Create a production environment file:

```bash
# .env.production
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
```

**⚠️ Important:** Never commit real API keys to public repositories!

---

## 🔗 Step 4: Configure Git Remote

If you haven't already, add your GitHub repository as a remote:

```bash
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Verify remote
git remote -v
```

---

## 📤 Step 5: Deploy to GitHub Pages

### Initial Build and Deploy

```bash
# Build the application
npm run build

# Deploy to GitHub Pages
npm run deploy
```

This will:
1. Run the `predeploy` script (builds your app)
2. Create a `gh-pages` branch (if it doesn't exist)
3. Push the built files to the `gh-pages` branch

### Push Source Code

Don't forget to push your source code to the main branch:

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Configure project for GitHub Pages deployment"

# Push to main branch
git push origin main
```

---

## ⚙️ Step 6: Configure GitHub Pages Settings

1. **Navigate to your GitHub repository**
2. **Go to Settings tab**
3. **Scroll to Pages section** (in the sidebar under "Code and automation")
4. **Configure Build and deployment:**
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. **Click Save**

---

## 🎉 Step 7: Access Your Deployed App

After a few minutes, your app will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME
```

**GitHub will show you the exact URL in the Pages settings.**

---

## 🔄 Updating Your Deployment

Whenever you want to update your deployed app:

```bash
# 1. Make your changes and test locally
npm run dev

# 2. Deploy the updated version
npm run deploy

# 3. Push source code changes
git add .
git commit -m "Update application"
git push origin main
```

---

## 🛠 Advanced Configuration

### Custom Domain

To use a custom domain:

1. **Add CNAME file** to your `public` folder:
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Configure DNS** at your domain provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: YOUR_USERNAME.github.io
   ```

3. **Update GitHub Pages settings** to use your custom domain

### Environment-Specific Builds

Create different environment configurations:

```json
{
  "scripts": {
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "deploy:staging": "npm run build:staging && gh-pages -d dist",
    "deploy:production": "npm run build:production && gh-pages -d dist"
  }
}
```

---

## 🔍 Troubleshooting

### Common Issues

**1. Blank page after deployment**
- Check the `homepage` field in `package.json`
- Ensure the path matches your repository name
- Verify the build completes successfully

**2. 404 errors on routes**
- GitHub Pages doesn't support client-side routing by default
- Add a `404.html` file that redirects to `index.html`

**3. Environment variables not working**
- Ensure variables start with `VITE_`
- Check that variables are set in the correct environment file
- Verify the build process includes environment files

**4. API key issues**
- Never commit real API keys to public repositories
- Consider using GitHub Actions for secure deployment
- Use demo data or public APIs for portfolio demonstrations

### Debugging Steps

```bash
# 1. Test local build
npm run build
npm run preview

# 2. Check build output
ls -la dist/

# 3. Verify environment variables
npm run build -- --debug

# 4. Test deployment locally
npx gh-pages -d dist --dry-run
```

---

## 🔒 Security Best Practices

### For Public Repositories

1. **Never commit sensitive data**:
   ```bash
   # Add to .gitignore
   .env
   .env.local
   .env.production
   ```

2. **Use public APIs or demo keys**:
   ```javascript
   // Use demo/limited API keys for public demos
   const API_KEY = import.meta.env.VITE_DEMO_API_KEY || 'demo-key';
   ```

3. **Consider using GitHub Actions** for secure deployments with secrets

### For Private Repositories

1. **Use GitHub Secrets** for sensitive environment variables
2. **Set up GitHub Actions** for automated deployment
3. **Use proper environment variable management**

---

## 📊 Monitoring Your Deployment

### GitHub Pages Analytics

Monitor your deployment:
- **GitHub repository insights**
- **GitHub Pages build status**
- **Repository traffic statistics**

### Performance Monitoring

Add performance monitoring:
```html
<!-- Add to index.html -->
<script>
  // Simple performance monitoring
  window.addEventListener('load', () => {
    console.log('Page load time:', performance.now());
  });
</script>
```

---

## 🎯 Deployment Checklist

Before deploying, ensure:

- [ ] `gh-pages` package installed
- [ ] `homepage` configured in `package.json`
- [ ] Deployment scripts added
- [ ] Environment variables configured
- [ ] Git remote configured
- [ ] Application builds successfully locally
- [ ] All sensitive data removed from repository
- [ ] GitHub Pages settings configured
- [ ] Custom domain configured (if applicable)

---

## 📞 Support & Resources

### Official Documentation
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Create React App Deployment Guide](https://create-react-app.dev/docs/deployment/#github-pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

### Helpful Commands
```bash
# Check deployment status
gh-pages --help

# Deploy with custom commit message
npm run deploy -- -m "Deploy v1.2.0"

# Deploy from different branch
gh-pages -d dist -b production

# Clean gh-pages cache
npx gh-pages-clean
```

---

## 🚀 Success!

Your Random Movie Picker is now deployed to GitHub Pages! 

**Next steps:**
- Share your live demo URL
- Add the deployment link to your portfolio
- Consider setting up automated deployments
- Monitor performance and user feedback

---

*For additional help or questions about deployment, refer to the [GitHub Pages documentation](https://docs.github.com/en/pages) or open an issue in this repository.* 