export interface LetterboxdMovie {
  Name: string;
  Year: string;
  'Letterboxd URI': string;
}

export interface ParsedLetterboxdMovie {
  title: string;
  year: number;
  letterboxdUrl: string;
  tmdbId?: number;
  posterPath?: string;
} 