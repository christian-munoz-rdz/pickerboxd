import { Movie, Genre } from '@/types/movie';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { tmdbService } from '@/services/tmdb';
import { Star, Calendar } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
}

export function MovieCard({ movie, genres }: MovieCardProps) {
  const movieGenres = genres.filter(genre => movie.genre_ids.includes(genre.id));
  const releaseYear = new Date(movie.release_date).getFullYear();
  
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={tmdbService.getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-[400px] object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-movie.jpg';
          }}
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-2">{movie.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {releaseYear}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {movie.overview}
        </p>
        
        {movieGenres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {movieGenres.slice(0, 3).map(genre => (
              <Badge key={genre.id} variant="secondary" className="text-xs">
                {genre.name}
              </Badge>
            ))}
            {movieGenres.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{movieGenres.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 