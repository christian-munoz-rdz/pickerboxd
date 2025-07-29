import { useState, useEffect } from 'react';
import { Movie, Genre } from '@/types/movie';
import { ParsedLetterboxdMovie } from '@/types/letterboxd';
import { tmdbService } from '@/services/tmdb';
import { LetterboxdService } from '@/services/letterboxd';
import { MovieCard } from './MovieCard';
import { LetterboxdMovieCard } from './LetterboxdMovieCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shuffle, Filter, Loader2, Upload, Film, List } from 'lucide-react';

interface Filters {
  genres: number[];
  minRating: number;
  category: 'popular' | 'top_rated' | 'now_playing' | 'upcoming';
}

type MovieSource = 'tmdb' | 'letterboxd';

export function MoviePicker() {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [currentLetterboxdMovie, setCurrentLetterboxdMovie] = useState<ParsedLetterboxdMovie | null>(null);
  const [letterboxdMovies, setLetterboxdMovies] = useState<ParsedLetterboxdMovie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [movieSource, setMovieSource] = useState<MovieSource>('tmdb');
  const [filters, setFilters] = useState<Filters>({
    genres: [],
    minRating: 0,
    category: 'popular'
  });

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      const genreList = await tmdbService.getGenres();
      setGenres(genreList);
    } catch (error) {
      console.error('Failed to load genres:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const movies = await LetterboxdService.parseFile(file);
      setLetterboxdMovies(movies);
      setMovieSource('letterboxd');
      setCurrentMovie(null);
      setCurrentLetterboxdMovie(null);
    } catch (error) {
      console.error('Failed to parse Letterboxd file:', error);
      alert('Failed to parse Letterboxd file. Please make sure it\'s a valid export.');
    } finally {
      setLoading(false);
    }
  };

  const getRandomMovie = async () => {
    setLoading(true);
    try {
      if (movieSource === 'letterboxd') {
        if (letterboxdMovies.length === 0) {
          alert('Please upload your Letterboxd export first.');
          return;
        }
        
        const randomMovie = LetterboxdService.getRandomMovie(letterboxdMovies);
        if (randomMovie) {
          const enrichedMovie = await LetterboxdService.enrichMovieWithPoster(randomMovie);
          setCurrentLetterboxdMovie(enrichedMovie);
          setCurrentMovie(null);
        }
      } else {
        // Get random page number (1-20 for better variety)
        const randomPage = Math.floor(Math.random() * 20) + 1;
        
        let movieResponse;
        
        if (filters.genres.length > 0 || filters.minRating > 0) {
          movieResponse = await tmdbService.discoverMovies({
            page: randomPage,
            genreIds: filters.genres,
            minRating: filters.minRating || undefined
          });
        } else {
          switch (filters.category) {
            case 'top_rated':
              movieResponse = await tmdbService.getTopRatedMovies(randomPage);
              break;
            case 'now_playing':
              movieResponse = await tmdbService.getNowPlayingMovies(randomPage);
              break;
            case 'upcoming':
              movieResponse = await tmdbService.getUpcomingMovies(randomPage);
              break;
            default:
              movieResponse = await tmdbService.getPopularMovies(randomPage);
          }
        }

        if (movieResponse.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * movieResponse.results.length);
          setCurrentMovie(movieResponse.results[randomIndex]);
          setCurrentLetterboxdMovie(null);
        }
      }
    } catch (error) {
      console.error('Failed to fetch random movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleGenre = (genreId: number) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genreId)
        ? prev.genres.filter(id => id !== genreId)
        : [...prev.genres, genreId]
    }));
  };

  const resetFilters = () => {
    setFilters({
      genres: [],
      minRating: 0,
      category: 'popular'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎬 Random Movie Picker
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover your next favorite movie with a single click!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/3">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Movie Source</CardTitle>
              <CardDescription>Choose where to pick movies from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={movieSource === 'tmdb' ? 'default' : 'outline'}
                  onClick={() => setMovieSource('tmdb')}
                  className="flex items-center gap-2"
                >
                  <Film className="w-4 h-4" />
                  TMDb
                </Button>
                <Button
                  variant={movieSource === 'letterboxd' ? 'default' : 'outline'}
                  onClick={() => setMovieSource('letterboxd')}
                  className="flex items-center gap-2"
                >
                  <List className="w-4 h-4" />
                  Letterboxd
                </Button>
              </div>

              {movieSource === 'letterboxd' && (
                <div className="mt-4">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="letterboxd-file"
                  />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('letterboxd-file')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Letterboxd CSV
                  </Button>
                  {letterboxdMovies.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {letterboxdMovies.length} movies loaded
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {movieSource === 'tmdb' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
                <CardDescription>
                  Customize your movie discovery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'popular', label: 'Popular' },
                      { key: 'top_rated', label: 'Top Rated' },
                      { key: 'now_playing', label: 'Now Playing' },
                      { key: 'upcoming', label: 'Upcoming' }
                    ].map(category => (
                      <Button
                        key={category.key}
                        variant={filters.category === category.key ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilters(prev => ({ ...prev, category: category.key as any }))}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Genre Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Genres</label>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {genres.map(genre => (
                      <Badge
                        key={genre.id}
                        variant={filters.genres.includes(genre.id) ? 'default' : 'outline'}
                        className="cursor-pointer transition-colors"
                        onClick={() => toggleGenre(genre.id)}
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Minimum Rating: {filters.minRating}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={filters.minRating}
                    onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={resetFilters} variant="outline" size="sm">
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:w-2/3 flex flex-col items-center">
          <Button
            onClick={getRandomMovie}
            disabled={loading || (movieSource === 'letterboxd' && letterboxdMovies.length === 0)}
            size="lg"
            className="mb-8 text-lg px-8 py-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Finding Movie...
              </>
            ) : (
              <>
                <Shuffle className="w-4 h-4 mr-2" />
                Pick Random Movie
              </>
            )}
          </Button>

          {currentMovie && <MovieCard movie={currentMovie} genres={genres} />}
          {currentLetterboxdMovie && <LetterboxdMovieCard movie={currentLetterboxdMovie} />}

          {!currentMovie && !currentLetterboxdMovie && !loading && (
            <Card className="w-full max-w-md">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold mb-2">Ready to Discover?</h3>
                {movieSource === 'letterboxd' && letterboxdMovies.length === 0 ? (
                  <p className="text-muted-foreground text-center">
                    Upload your Letterboxd CSV export to get started!
                  </p>
                ) : (
                  <p className="text-muted-foreground text-center">
                    Click the button above to find your next movie adventure!
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 