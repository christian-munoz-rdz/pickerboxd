import { LetterboxdMovie, ParsedLetterboxdMovie } from '@/types/letterboxd';
import { tmdbService } from './tmdb';

export class LetterboxdService {
  private static parseCSV(csvText: string): LetterboxdMovie[] {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1)
      .filter(line => line.trim().length > 0)
      .map(line => {
        const values = line.split(',').map(value => value.trim());
        const movie: any = {};
        
        headers.forEach((header, index) => {
          movie[header] = values[index] || '';
        });
        
        return movie as LetterboxdMovie;
      });
  }

  private static parseMovie(movie: LetterboxdMovie): ParsedLetterboxdMovie {
    return {
      title: movie.Name,
      year: parseInt(movie.Year) || 0,
      letterboxdUrl: movie['Letterboxd URI']
    };
  }

  static async parseFile(file: File): Promise<ParsedLetterboxdMovie[]> {
    try {
      const text = await file.text();
      const movies = this.parseCSV(text);
      return movies.map(movie => this.parseMovie(movie));
    } catch (error) {
      console.error('Error parsing Letterboxd CSV:', error);
      throw new Error('Failed to parse Letterboxd CSV file. Please make sure it\'s a valid export from Letterboxd.');
    }
  }

  static getRandomMovie(movies: ParsedLetterboxdMovie[]): ParsedLetterboxdMovie | null {
    if (!movies.length) return null;
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  }

  static async enrichMovieWithPoster(movie: ParsedLetterboxdMovie): Promise<ParsedLetterboxdMovie> {
    try {
      const searchResult = await tmdbService.searchMovie(movie.title, movie.year);
      if (searchResult.results.length > 0) {
        const tmdbMovie = searchResult.results[0];
        return {
          ...movie,
          tmdbId: tmdbMovie.id,
          posterPath: tmdbMovie.poster_path || undefined
        };
      }
    } catch (error) {
      console.error(`Failed to fetch TMDb data for ${movie.title}:`, error);
    }
    return movie;
  }
} 