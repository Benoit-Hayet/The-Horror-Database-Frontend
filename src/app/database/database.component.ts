import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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



