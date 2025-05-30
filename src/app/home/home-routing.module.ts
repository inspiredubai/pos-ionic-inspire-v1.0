import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { OutletComponent } from './outlet/outlet.component';
//import { Chart } from 'chart.js';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'outlet',
    component: OutletComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
