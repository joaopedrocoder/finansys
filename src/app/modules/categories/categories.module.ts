import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from "../../core/core.module";

@NgModule({
    declarations: [
      CategoryListComponent,
      CategoryFormComponent
    ],
    exports: [],
    imports: [
      CommonModule,
      CategoriesRoutingModule,
      SharedModule,
      CoreModule
    ]
})
export class CategoriesModule { }
