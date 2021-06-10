import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { dashboardRoutes } from './dashboard.routes';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }
