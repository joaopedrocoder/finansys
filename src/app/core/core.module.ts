import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BreadCrumbComponent,
    RouterModule
  ]
})
export class CoreModule { }
