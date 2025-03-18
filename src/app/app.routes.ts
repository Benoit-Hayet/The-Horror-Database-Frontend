import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DatabaseComponent } from './database/database.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { AccountComponent } from './account/account.component';
import { FavoriteMovieComponent } from './favorite-movie/favorite-movie.component';
import { MyReviewComponent } from './my-review/my-review.component';
import { MyAddMovieComponent } from './my-add-movie/my-add-movie.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminAddMovieComponent } from './admin-add-movie/admin-add-movie.component';
import { AdminDatabaseComponent } from './admin-database/admin-database.component';
import { AdminMembersComponent } from './admin-members/admin-members.component';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';

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
    path: 'member-home',
    component: MemberHomeComponent,
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
