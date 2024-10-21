import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DatabaseComponent } from './database/database.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CreateAccountComponent } from './create-account/create-account.component';


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
    }
];
