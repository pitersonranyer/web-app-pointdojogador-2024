import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { GerarCompeticaoLigaCartolaComponent } from './gerar-competicao-liga-cartola.component';
import { AddCompeticaoDialogComponent } from './add-competicao-dialog/add-competicao-dialog.component';



export const routes: Routes = [
  { path: '', component: GerarCompeticaoLigaCartolaComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    GerarCompeticaoLigaCartolaComponent,
    AddCompeticaoDialogComponent
  ]
})
export class GerarCompeticaoLigaCartolaModule { }
