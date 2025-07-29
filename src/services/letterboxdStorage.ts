import { ParsedLetterboxdMovie } from '@/types/letterboxd';

const STORAGE_KEY = 'letterboxd_movies';
const METADATA_KEY = 'letterboxd_metadata';

interface LetterboxdMetadata {
  uploadDate: string;
  totalMovies: number;
  fileName: string;
}

export class LetterboxdStorageService {
  static saveMovies(movies: ParsedLetterboxdMovie[], fileName: string): void {
    try {
      const metadata: LetterboxdMetadata = {
        uploadDate: new Date().toISOString(),
        totalMovies: movies.length,
        fileName: fileName
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
      localStorage.setItem(METADATA_KEY, JSON.stringify(metadata));
    } catch (error) {
      console.error('Failed to save Letterboxd data to storage:', error);
      throw new Error('Failed to save Letterboxd data. Storage might be full.');
    }
  }

  static loadMovies(): ParsedLetterboxdMovie[] | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load Letterboxd data from storage:', error);
      return null;
    }
  }

  static getMetadata(): LetterboxdMetadata | null {
    try {
      const data = localStorage.getItem(METADATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load Letterboxd metadata from storage:', error);
      return null;
    }
  }

  static clearData(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(METADATA_KEY);
    } catch (error) {
      console.error('Failed to clear Letterboxd data from storage:', error);
    }
  }

  static hasStoredData(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }

  static exportToCSV(movies: ParsedLetterboxdMovie[], fileName: string = 'letterboxd_export'): void {
    const headers = ['Name', 'Year', 'Letterboxd URI'];
    const csvContent = [
      headers.join(','),
      ...movies.map(movie => [
        `"${movie.title}"`,
        movie.year,
        `"${movie.letterboxdUrl}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  static exportToJSON(movies: ParsedLetterboxdMovie[], fileName: string = 'letterboxd_export'): void {
    const jsonData = {
      exportDate: new Date().toISOString(),
      totalMovies: movies.length,
      movies: movies
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  static getStorageSize(): string {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return '0 KB';
      
      const sizeInBytes = new Blob([data]).size;
      const sizeInKB = (sizeInBytes / 1024).toFixed(1);
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(1);
      
      return sizeInBytes > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`;
    } catch (error) {
      return 'Unknown';
    }
  }
} 