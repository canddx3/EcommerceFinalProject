import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import  { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
    ]
  }
];
