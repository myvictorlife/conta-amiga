import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelsPage } from './travels.page';

const routes: Routes = [
  {
    path: '',
    component: TravelsPage
  },  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelsPageRoutingModule {}
