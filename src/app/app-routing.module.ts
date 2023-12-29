import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'categories', 
    loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule) 
  },
  { 
    path: 'entries', 
    loadChildren: () => import('./modules/entries/entries.module').then(m => m.EntriesModule) 
  },
  { 
    path: 'reports', 
    loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
