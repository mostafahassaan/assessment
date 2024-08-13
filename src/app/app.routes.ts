import { Routes } from '@angular/router';
import { UserDetailsComponent } from './features/user-details/user-details.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { UserListComponent } from './features/user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: 'user/:id', component: UserDetailsComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
