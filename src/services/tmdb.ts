import { Movie, MovieResponse, Genre, GenreResponse, WatchProvider, WatchProviderResponse, WatchProvidersListResponse } from '@/types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500';

class TMDbService {
  private async request<T>(endpoint: string): Promise<T> {
    if (!API_KEY) {
      throw new Error('TMDb API key is required. Please set VITE_TMDB_API_KEY in your environment variables.');
    }

    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`TMDb API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('TMDb API request failed:', error);
      throw error;
    }
  }

  async searchMovie(query: string, year?: number): Promise<MovieResponse> {
    let endpoint = `/search/movie?query=${encodeURIComponent(query)}`;
    if (year) {
      endpoint += `&year=${year}`;
    }
    return this.request<MovieResponse>(endpoint);
  }

  async getMovieWatchProviders(movieId: number): Promise<WatchProviderResponse> {
    return this.request<WatchProviderResponse>(`/movie/${movieId}/watch/providers`);
  }

  async getAvailableWatchProviders(region: string = 'US'): Promise<WatchProvider[]> {
    const response = await this.request<WatchProvidersListResponse>('/watch/providers/movie');
    return response.results
      .filter(provider => provider.display_priority <= 30) // Only show major providers
      .sort((a, b) => a.display_priority - b.display_priority);
  }

  async discoverMoviesByProvider(
    providerId: number,
    page: number = 1,
    region: string = 'US'
  ): Promise<MovieResponse> {
    return this.request<MovieResponse>(
      `/discover/movie?with_watch_providers=${providerId}&watch_region=${region}&page=${page}`
    );
  }

  async discoverMovies(options: {
    page?: number;
    genreIds?: number[];
    minRating?: number;
    maxRating?: number;
    year?: number;
  } = {}): Promise<MovieResponse> {
    const {
      page = 1,
      genreIds = [],
      minRating,
      maxRating,
      year
    } = options;

    let endpoint = `/discover/movie?page=${page}`;
    
    if (genreIds.length > 0) {
      endpoint += `&with_genres=${genreIds.join(',')}`;
    }
    
    if (minRating !== undefined) {
      endpoint += `&vote_average.gte=${minRating}`;
    }
    
    if (maxRating !== undefined) {
      endpoint += `&vote_average.lte=${maxRating}`;
    }
    
    if (year) {
      endpoint += `&year=${year}`;
    }

    return this.request<MovieResponse>(endpoint);
  }

  async getPopularMovies(page: number = 1): Promise<MovieResponse> {
    return this.request<MovieResponse>(`/movie/popular?page=${page}`);
  }

  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    return this.request<MovieResponse>(`/movie/top_rated?page=${page}`);
  }

  async getNowPlayingMovies(page: number = 1): Promise<MovieResponse> {
    return this.request<MovieResponse>(`/movie/now_playing?page=${page}`);
  }

  async getUpcomingMovies(page: number = 1): Promise<MovieResponse> {
    return this.request<MovieResponse>(`/movie/upcoming?page=${page}`);
  }

  async getGenres(): Promise<Genre[]> {
    const response = await this.request<GenreResponse>('/genre/movie/list');
    return response.genres;
  }

  getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) return '/placeholder-movie.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

export const tmdbService = new TMDbService(); 