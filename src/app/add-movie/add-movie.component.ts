import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { country } from '../model/country.model';
import { countries } from '../data/country.data';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss',
})
export class AddMovieComponent {
  formBuilder = inject(FormBuilder);

  countryMap: country[] = countries;

  addMovieForm = this.formBuilder.group({
    title: [''],
    country: [''],
    releaseYear: [''],
    director: [''],
    synopsis: [''],
    status: [''],
    posterUrl: [''],
    createdBy: [''],
    createdAt: [''],
    genreName: [''],
  });
  
  onSubmit() {
    console.log(this.addMovieForm.value);
  }

}
