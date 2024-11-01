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


export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {path:'database',
    component: DatabaseComponent},
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'about',
        component:AboutComponent
    },
    {
        path:'create-account',
        component:CreateAccountComponent
    },
    {
        path:'member-home',
        component:MemberHomeComponent
    },
    { 
    path:'account',
    component:AccountComponent
},
{ 
    path:'favorite-movie',
    component:FavoriteMovieComponent
},
{ 
    path:'my-review',
    component:MyReviewComponent
},
{ 
    path:'my-add-movie',
    component:MyAddMovieComponent
},

];
