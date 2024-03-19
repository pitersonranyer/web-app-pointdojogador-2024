import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AtletaProvavelComponent } from './atleta-provavel.component';



export const routes: Routes = [
  { path: '', component: AtletaProvavelComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AtletaProvavelComponent
  ]
})
export class AtletProvavelModule { }
