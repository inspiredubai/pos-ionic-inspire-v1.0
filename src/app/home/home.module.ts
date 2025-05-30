import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { Chart } from 'chart.js';
import { SharedModule } from '../Shared/shared/shared.module';
import { OutletComponent } from './outlet/outlet.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,

    SharedModule
  ],
  declarations: [
    HomePage,
    OutletComponent,
    DashboardComponent
  ]
})
export class HomePageModule { }
