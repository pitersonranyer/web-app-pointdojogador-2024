import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AddTimeFavoritoComponent } from './add-time-favorito.component';





export const routes: Routes = [
  { path: '', component: AddTimeFavoritoComponent, pathMatch: 'full' }
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
    AddTimeFavoritoComponent
  ]
})
export class AddTimeFavoritoModule { }
