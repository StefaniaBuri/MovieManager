import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'acercade',
    loadComponent: () => import('./pages/acercade/acercade.page').then( m => m.AcercadePage)
  },
  {
    path: 'consulta/:fav',
    loadComponent: () => import('./pages/consulta/consulta.page').then( m => m.ConsultaPage)
  },
  {
    path: 'busqueda',
    loadComponent: () => import('./pages/busqueda/busqueda.page').then( m => m.BusquedaPage)
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro-page/intro-page.page').then( m => m.IntroPage)
  },
  {
    path: 'favoritos/:fav',
    loadComponent: () => import('./pages/consulta/consulta.page').then( m => m.ConsultaPage)
  },
  {
    path: 'detalle/:imdbID',
    loadComponent: () => import('./pages/detalle/detalle.page').then( m => m.DetallePage)
  },
];
