import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ListarTimeGrupoCartolaComponent } from './listar-time-grupo-cartola.component';


export const routes: Routes = [
  { path: '', component: ListarTimeGrupoCartolaComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ListarTimeGrupoCartolaComponent
  ]
})
export class ListarTimeGrupoCartolaModule { }
