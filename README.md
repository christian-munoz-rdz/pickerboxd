# 🎬 Random Movie Picker

A beautiful, modern web application for discovering random movies using The Movie Database (TMDb) API. Built with React, TypeScript, Vite, and Shadcn/UI.

## Features

- 🎲 **Random Movie Discovery**: Get random movie suggestions with a single click
- 🎭 **Genre Filtering**: Filter movies by your favorite genres
- ⭐ **Rating Filter**: Set minimum rating requirements
- 📂 **Category Selection**: Choose from Popular, Top Rated, Now Playing, or Upcoming movies
- 🎨 **Beautiful UI**: Modern, responsive design with Shadcn/UI components
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- ⚡ **Fast**: Built with Vite for lightning-fast development and build times

## Screenshots

The application features a clean, modern interface with:
- Interactive movie cards displaying posters, ratings, and descriptions
- Sidebar filters for customizing your movie discovery
- Smooth animations and hover effects
- Dark/light theme support (via Shadcn/UI)

## Setup Instructions

### Prerequisites

- Node.js (version 20.19.0 or higher recommended)
- NPM or Yarn
- TMDb API Key (free from [The Movie Database](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone or download this project**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Get your TMDb API key**:
   - Go to [TMDb](https://www.themoviedb.org/)
   - Create a free account
   - Go to Settings > API and request an API key
   - Copy your API key

4. **Set up environment variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your TMDb API key:
     ```
     VITE_TMDB_API_KEY=your_actual_api_key_here
     VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
     VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
     ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** and go to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

1. **Set your preferences** (optional):
   - Choose a movie category (Popular, Top Rated, etc.)
   - Set a minimum rating
   - Select your favorite genres

2. **Click "Pick Random Movie"** to discover a new film

3. **Enjoy your discovery!** The app will show you:
   - Movie poster and title
   - Release year and rating
   - Plot overview
   - Genres

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful, accessible UI components
- **Lucide React** - Modern icon library
- **TMDb API** - Movie data and images

## API Credits

This product uses the TMDb API but is not endorsed or certified by TMDb.

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## Troubleshooting

**Movie images not loading?**
- Check that your TMDb API key is correctly set in the `.env` file
- Make sure you're not exceeding the API rate limits

**App not starting?**
- Ensure you have Node.js 20.19.0 or higher
- Try deleting `node_modules` and running `npm install` again
- Check that all environment variables are set correctly 