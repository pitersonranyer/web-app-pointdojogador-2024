import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AtletaTimeCartolaComponent } from './atleta-time-cartola.component';



export const routes: Routes = [
  { path: '', component: AtletaTimeCartolaComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AtletaTimeCartolaComponent
  ]
})
export class AtletaTimeCartolaModule { }
