import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CompeticaoLigaCartolaComponent } from './competicao-liga-cartola.component';



export const routes: Routes = [
  { path: '', component: CompeticaoLigaCartolaComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CompeticaoLigaCartolaComponent
  ]
})
export class CompeticaoLigaCartolaModule { }
