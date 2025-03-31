import { Component } from '@angular/core';

@Component({
  selector: 'app-no-page',
  standalone: true,
  imports: [],
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.scss'
})
export class NoPageComponent {
  horror404: string = 'assets/Horror_404.png';
}
