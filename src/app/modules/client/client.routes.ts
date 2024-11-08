import { Routes } from '@angular/router';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { ClientRegisterComponent } from './pages/client-register/client-register.component';
import { ClientEditComponent } from './pages/client-edit/client-edit.component';
import { ClientDetailComponent } from './pages/client-detail/client-detail.component';

export const ClientRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    title: 'Clientes',
    data: { title: 'Clientes' },
    component: ClientListComponent,
  },
  {
    path: 'register',
    title: 'Novo Cliente',
    data: { title: 'Novo Cliente' },
    component: ClientRegisterComponent,
  },
  {
    path: 'edit/:id',
    title: 'Atualizar Cliente',
    data: { title: 'Atualizar Cliente' },
    component: ClientEditComponent,
  },
  {
    path: 'detail/:id',
    title: 'Detalhes do Cliente',
    data: { title: 'Detalhes do Cliente' },
    component: ClientDetailComponent,
  },
];
