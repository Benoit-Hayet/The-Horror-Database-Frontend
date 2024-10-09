import { Component } from '@angular/core';
import { countries } from '../movies/country.data';
import { CommonModule } from '@angular/common';
import { country } from '../model/country.model';


@Component({
  selector: 'app-database',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent {

  countryMap : country[] = countries;
}



