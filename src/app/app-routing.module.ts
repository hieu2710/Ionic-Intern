import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [],
  },
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full'
  },
    {
    path: 'sign-up',
    loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
},
  {
    path: 'sign-in',
    loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then( m => m.SignInPageModule)

  },
  {
    path: 'token',
    loadChildren: () => import('./modules/check/token/token.module').then( m => m.TokenPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
