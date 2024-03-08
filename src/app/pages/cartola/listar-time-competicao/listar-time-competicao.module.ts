import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ListarTimeCompeticaoComponent } from './listar-time-competicao.component';




export const routes: Routes = [
  { path: '', component: ListarTimeCompeticaoComponent, pathMatch: 'full' }
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
    ListarTimeCompeticaoComponent
  ]
})
export class ListarTimeCompeticaoModule { }
