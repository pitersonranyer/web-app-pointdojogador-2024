import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GerenciarPerfilComponent } from './gerenciar-perfil.component';

export const routes: Routes = [
  { path: '', component: GerenciarPerfilComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GerenciarPerfilComponent
  ]
})
export class CarteiraModule { }
