import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { country } from '../model/country.model';
import { countries } from '../data/country.data';
import { genre } from '../model/genre.model';
import { genres } from '../data/genre.data';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent {
  formBuilder = inject(FormBuilder);
  countryMap: country[] = countries;
  genreMap: genre[] = genres;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router); // Injection du service Router

  isLoggedOk(): boolean {
    return this.authService.isLoggedIn();
  }

  constructor(private movieService: MovieService) {}

  addMovieForm = this.formBuilder.group({
    title: [''],
    country: [''],
    releaseYear: [''],
    director: [''],
    synopsis: [''],
    status: ['PENDING'],
    posterUrl: [''],
    createdAt: [new Date().toISOString().split('T')[0]],
    genreName: [''],
  });

  onCountryChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedCountry = this.countryMap.find(
      (item) => item.id === +selectedId,
    );
    if (selectedCountry) {
      this.addMovieForm.patchValue({ country: selectedCountry.name });
    }
  }

  onGenreChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedGenre = this.genreMap.find(
      (genre) => genre.id === +selectedId,
    );
    if (selectedGenre) {
      this.addMovieForm.patchValue({ genreName: selectedGenre.name });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadFile(file).subscribe(
        (url: string) => {
          this.addMovieForm.patchValue({ posterUrl: url });
          console.log('Image uploadée, URL :', url);
        },
        (error) => {
          console.error('Erreur lors de l’upload de l’image', error);
        },
      );
    }
  }

  // Méthode pour envoyer l'image au backend
  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    // Supposons que le MovieService ait une méthode `uploadImage`.
    return this.movieService.uploadImage(formData);
  }

  onSubmit() {
    if (this.addMovieForm.valid) {
      const {
        title = '',
        country = '',
        releaseYear = '',
        director = '',
        synopsis = '',
        status = '',
        posterUrl = '',
        genreName = '',
      } = this.addMovieForm.value;

      const genres = genreName ? [genreName] : [];

      this.movieService
        .addMovie(
          title || '',
          country || '',
          releaseYear || '',
          director || '',
          synopsis || '',
          status || '',
          posterUrl || '',
          genres,
        )
        .subscribe(
          (response: any) => {
            console.log('Ajout Film Ok', response);

            // Utiliser SweetAlert2 pour une alerte plus jolie
            Swal.fire({
              title: 'Film ajouté avec succès !',
              text: "Votre film a bien été ajouté. Merci d'attendre la validation de l'administrateur.",
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                // Redirection vers une autre page (par exemple, la liste des films)
                this.router.navigate(['/database']);
              }
            });
          },
          (error: Error) => {
            console.error("Erreur lors de l'ajout", error.message);

            // Alerte en cas d'erreur
            Swal.fire({
              title: 'Erreur',
              text: "Une erreur est survenue lors de l'ajout du film. Veuillez réessayer.",
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        );
    }
  }
}
