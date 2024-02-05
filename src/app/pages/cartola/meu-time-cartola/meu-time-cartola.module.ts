import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { MeuTimeCartolaComponent } from './meu-time-cartola.component';
import { ImportaTimeFavoritoDialogComponent } from './importa-time-favorito-dialog/importa-time-favorito-dialog.component';



export const routes: Routes = [
  { path: '', component: MeuTimeCartolaComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    MeuTimeCartolaComponent,
    ImportaTimeFavoritoDialogComponent
  ]
})
export class MeuTimeCartolaModule { }
