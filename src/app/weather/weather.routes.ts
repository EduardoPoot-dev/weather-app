import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const weatherRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  }
];
export default weatherRoutes;
