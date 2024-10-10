import { Component } from '@angular/core';
import { countries } from '../data/country.data';
import { CommonModule } from '@angular/common';
import { country } from '../model/country.model';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-database',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent {

}



