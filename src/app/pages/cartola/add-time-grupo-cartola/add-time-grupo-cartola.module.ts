import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AddTimeGrupoCartolaComponent } from './add-time-grupo-cartola.component';




export const routes: Routes = [
  { path: '', component: AddTimeGrupoCartolaComponent, pathMatch: 'full' }
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
    AddTimeGrupoCartolaComponent
  ]
})
export class AddTimeGrupoCartolaModule { }
