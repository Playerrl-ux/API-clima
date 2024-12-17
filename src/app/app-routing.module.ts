import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'bookmarks', loadChildren: () => import('./bookmark-page/bookmark-page.module').then(m => m.BookmarkPageModule)},
  {path: 'details/:lat/:lon', loadChildren: () => import('./details-page/details-page.module').then(m => m.DetailsPageModule)},
  {path: 'details/:name', loadChildren: () => import('./details-page/details-page.module').then(m => m.DetailsPageModule)},
  {path: '**', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
