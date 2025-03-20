import { Routes } from '@angular/router';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminDatabaseComponent } from './Admin/admin-database/admin-database.component';
import { AdminMembersComponent } from './Admin/admin-members/admin-members.component';
import { AdminReviewsComponent } from './Admin/admin-reviews/admin-reviews.component';
import { AdminAddMovieComponent } from './Admin/admin-add-movie/admin-add-movie.component';
import { HomeComponent } from './Visitor/home/home.component';
import { DatabaseComponent } from './Visitor/database/database.component';
import { AboutComponent } from './Visitor/about/about.component';
import { CreateAccountComponent } from './Visitor/create-account/create-account.component';
import { AccountComponent } from './Member/account/account.component';
import { FavoriteMovieComponent } from './Member/favorite-movie/favorite-movie.component';
import { MyReviewComponent } from './Member/my-review/my-review.component';
import { MyAddMovieComponent } from './Member/my-add-movie/my-add-movie.component';
import { MovieReviewComponent } from './Visitor/movie-review/movie-review.component';
import { AddMovieComponent } from './Member/add-movie/add-movie.component';
import { LoginComponent } from './Visitor/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'database', component: DatabaseComponent },
  {
    path: 'add-movie',
    component: AddMovieComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'visitor',
    },
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'visitor',
    },
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'user',
    },
  },
  {
    path: 'favorite-movie',
    component: FavoriteMovieComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'user',
    },
  },
  {
    path: 'my-review',
    component: MyReviewComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'user',
    },
  },
  {
    path: 'my-add-movie',
    component: MyAddMovieComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'user',
    },
  },
  {
    path: 'movie-review/:movieIdPath',
    component: MovieReviewComponent,
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'admin',
    },
  },
  {
    path: 'admin-add-movie',
    component: AdminAddMovieComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'admin',
    },
  },
  {
    path: 'admin-database',
    component: AdminDatabaseComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'admin',
    },
  },
  {
    path: 'admin-members',
    component: AdminMembersComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'admin',
    },
  },
  {
    path: 'admin-reviews',
    component: AdminReviewsComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'admin',
    },
  },
];
