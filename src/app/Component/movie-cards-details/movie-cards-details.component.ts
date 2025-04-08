import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { movieCards } from '../../model/movieCards.model';
import { favorite } from '../../model/favorite.model';
import { ApiService } from '../../../services/api.service';
import { FavoriteService } from '../../../services/favorite.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-movie-cards-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-cards-details.component.html',
  styleUrl: './movie-cards-details.component.scss',
})
export class MovieCardsDetailsComponent implements OnInit {
  movieCards: movieCards[] = [];
  filteredMovieCards: movieCards[] = [];
  orderTitles: movieCards[] = [];
  orderRating: movieCards[] = [];
  averageScores: { [key: number]: number } = {}; // Stocke la moyenne de chaque film
  stars: number[] = [1, 2, 3, 4, 5];
  favorite:favorite[] = [];

  @Input() genreClicked: string = '';
  @Input() yearClicked: any = '';
  @Input() countryClicked: string = '';
  @Input() orderByTitle: string = '';
  @Input() orderByRating: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService,private favoriteService: FavoriteService,private authService: AuthService) {}

  ngOnInit() {
    this.apiService.getAllMovies().subscribe((response) => {
      this.movieCards = response.filter(
        (movie: any) => movie.status === 'APPROVED',
      );
      this.filteredMovieCards = [...this.movieCards];
      this.orderTitles = [...this.movieCards];
      this.orderRating = [...this.movieCards];
   
this.favoriteMovie();
      this.calculateAverageScores();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['genreClicked']) {
      this.filteredMovieCards = this.genreClicked
        ? this.movieCards.filter((movie) =>
            movie.genreName.includes(this.genreClicked),
          )
        : [...this.movieCards];
    }

    if (changes['yearClicked']) {
      this.filteredMovieCards = this.yearClicked
        ? this.movieCards.filter(
            (movie) =>
              movie.releaseYear >= this.yearClicked.start &&
              movie.releaseYear <= this.yearClicked.end,
          )
        : [...this.movieCards];
    }

    if (changes['countryClicked'] && this.countryClicked) {
      this.filteredMovieCards = this.movieCards.filter((movie) =>
        movie.country.includes(this.countryClicked),
      );
    }

    if (changes['orderByTitle']) {
      this.filteredMovieCards.sort((a, b) =>
        this.orderByTitle === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title),
      );
    }

    if (changes['orderByRating']) {
      this.filteredMovieCards = [...this.movieCards].sort(
        (a, b) =>
          this.orderByRating === 'asc'
            ? this.getRating(a) - this.getRating(b) 
            : this.getRating(b) - this.getRating(a),
      );
    }
  }

  getRating(movie: movieCards): number {
    const reviews = movie.userReview ?? [];
    return reviews.length > 0 ? reviews[0].rating : 0; // Prend la note du premier utilisateur, sinon 0
  }

  calculateAverageScores() {
    this.averageScores = {};

    this.movieCards.forEach((movie) => {
      const reviews = movie.userReview ?? [];

      if (reviews.length > 0) {
        const totalScore = reviews.reduce(
          (sum, review) => sum + review.rating,
          0,
        );
        this.averageScores[movie.id] = totalScore / reviews.length;
      } else {
        this.averageScores[movie.id] = 0;
      }
    });
  }

  filterResults(search: string) {
    this.filteredMovieCards = search
      ? this.movieCards.filter(
          (movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase()) ||
            movie.director.toLowerCase().includes(search.toLowerCase()) ||
            movie.releaseYear.toString().includes(search),
        )
      : [...this.movieCards];
  }
  

  favoriteMovie() {
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.favoriteService.getFavoritesByUserId().subscribe((response) => {
        this.favorite = response;
        console.log(response)
      });
    }
  }
  
  isFavorite(movieId: number): boolean {
    return this.favorite ? this.favorite.some(fav => fav.movieId === movieId) : false;
  }
  
  toggleFavorite(movieId: number) {
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken && this.favorite) {
      const userId = decodedToken.id;
  
      // Trouver l'ID du favori à supprimer
      const favorite = this.favorite.find(fav => fav.movieId === movieId);
  
      if (favorite) {
        // Supprimer le favori en utilisant son ID
        this.favoriteService.removeFavorite(favorite.id).subscribe({
          next: () => {
            console.log('Favori supprimé avec succès');
            this.favorite = this.favorite.filter(fav => fav.id !== favorite.id);
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du favori', err);
          }
        });
      } else {
        // Ajouter le film aux favoris
        this.favoriteService.addFavorite(userId, movieId).subscribe({
          next: (response) => {
            console.log('Favori ajouté avec succès');
            this.favorite.push(response);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout du favori', err);
          }
        });
      }
    }
  }
  
}

   

  