import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RouterModule,
    BreadCrumbComponent,
    PageHeaderComponent,
    NavbarComponent
  ]
})
export class CoreModule { }
