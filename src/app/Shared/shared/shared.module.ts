import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './Components/loading/loading.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
//import { Chart } from 'chart.js';



@NgModule({
  declarations: [
    LoadingComponent,
    NavbarComponent,
    FooterComponent],

  imports: [
    CommonModule,
    IonicModule,
  
  ],
  exports: [
    LoadingComponent,
    NavbarComponent,
    FooterComponent
  ]

})
export class SharedModule { }
