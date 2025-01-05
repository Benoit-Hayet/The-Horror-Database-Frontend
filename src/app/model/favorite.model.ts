export interface favorite {
    id: number;
    movieId: number;
    userId: number;
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
    }>;
  }
  