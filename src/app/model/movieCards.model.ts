export interface movieCards {
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
    userReview?:Array <{
        id: number;
  avatarUrl: string;
  movieId: number;
  username: string;
  rating: number;
  review: string;
  title?: string;   
  releaseYear?: number;    
  genreName?: string;     
  posterUrl?: string;      
  synopsis?: string; 
    }>;
}
