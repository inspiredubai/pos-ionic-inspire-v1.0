import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './Shared/shared/GlobelRequest/admin-auth.guard';
// import { LoadingGuard } from './Shared/shared/Services/loading.guard';
//import { Chart } from 'chart.js';
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AdminAuthGuard],
  },
  {
    path:'auth',
    loadChildren:() => import( './auth/auth.module').then((ma) => ma.AuthModule),
    // canActivate: [LoadingGuard],
  },
  {

    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
    // canActivate: [LoadingGuard],

  },

];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
