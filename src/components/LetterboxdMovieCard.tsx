import { ParsedLetterboxdMovie } from '@/types/letterboxd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
import { tmdbService } from '@/services/tmdb';

interface LetterboxdMovieCardProps {
  movie: ParsedLetterboxdMovie;
}

export function LetterboxdMovieCard({ movie }: LetterboxdMovieCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={movie.posterPath ? tmdbService.getImageUrl(movie.posterPath) : '/placeholder-movie.jpg'}
          alt={movie.title}
          className="w-full h-[400px] object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-movie.jpg';
          }}
        />
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-2">
          {movie.title}
          <span className="text-muted-foreground ml-2">({movie.year})</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => window.open(movie.letterboxdUrl, '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Letterboxd
        </Button>
      </CardContent>
    </Card>
  );
} 