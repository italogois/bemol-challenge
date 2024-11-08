import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Início',
    data: { title: 'Início' },
    loadComponent: () => import('./modules/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: 'client',
    loadChildren: () => import('./modules/client/client.routes').then((routes) => routes.ClientRoutes),
  },
  { path: '**', redirectTo: 'home' },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
