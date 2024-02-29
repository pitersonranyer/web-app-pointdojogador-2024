import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import {  ParticiparCompeticaoCartolaComponent } from './participar-competicao-cartola.component';
import { FilterPipe } from './filter.pipe';


export const routes: Routes = [
  { path: '', component: ParticiparCompeticaoCartolaComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    ParticiparCompeticaoCartolaComponent, FilterPipe
  ]
})
export class ParticiparCompeticaoCartolaModule { }
