import { Component } from '@angular/core';
import { country } from '../model/country.model';
import { countries } from '../data/country.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  countryMap : country[] = countries;
}
