import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-navbar.component.html',
  styleUrl: './member-navbar.component.scss',
})
export class MemberNavbarComponent {}
