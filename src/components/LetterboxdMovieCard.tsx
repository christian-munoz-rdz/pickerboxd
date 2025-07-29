import { useState, useEffect } from 'react';
import { ParsedLetterboxdMovie } from '@/types/letterboxd';
import { WatchProvider } from '@/types/movie';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { ExternalLink, PlayCircle } from 'lucide-react';
import { tmdbService } from '@/services/tmdb';

interface LetterboxdMovieCardProps {
  movie: ParsedLetterboxdMovie;
}

export function LetterboxdMovieCard({ movie }: LetterboxdMovieCardProps) {
  const [streamingProviders, setStreamingProviders] = useState<WatchProvider[]>([]);

  useEffect(() => {
    if (movie.tmdbId) {
      loadStreamingProviders();
    }
  }, [movie.tmdbId]);

  const loadStreamingProviders = async () => {
    try {
      const response = await tmdbService.getMovieWatchProviders(movie.tmdbId!);
      const usProviders = response.results['US'];
      if (usProviders?.flatrate) {
        setStreamingProviders(usProviders.flatrate);
      }
    } catch (error) {
      console.error('Failed to load streaming providers:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden movie-card">
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
      
      <CardContent className="space-y-4">
        {streamingProviders.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              Available on:
            </h4>
            <div className="flex flex-wrap gap-2">
              {streamingProviders.map(provider => (
                <img
                  key={provider.provider_id}
                  src={tmdbService.getImageUrl(provider.logo_path, 'original')}
                  alt={provider.provider_name}
                  title={provider.provider_name}
                  className="w-8 h-8 rounded-full"
                  data-logo
                />
              ))}
            </div>
          </div>
        )}

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