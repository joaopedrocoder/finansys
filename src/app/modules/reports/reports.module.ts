import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class ReportsModule { }
