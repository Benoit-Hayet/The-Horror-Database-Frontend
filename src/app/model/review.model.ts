export interface review {
  id: number;
  avatarUrl: string;
  movieId: number;
  username: string;
  rating: number;
  review: string;
  title?: string;          // Ajouté pour compatibilité
  releaseYear?: number;    // Ajouté pour compatibilité
  genreName?: string;      // Ajouté pour compatibilité
  posterUrl?: string;      // Ajouté pour compatibilité
  synopsis?: string;       // Ajouté pour compatibilité
  movieDTOS?: Array<{
    id: number;
    title: string;
    country: string;
    releaseYear: number;
    director: string;
    synopsis: string;
    status: string;
    posterUrl: string;
    createdBy: number;
    createdAt: string;
    genreName: string[];
  }>; // Ajouté
}
