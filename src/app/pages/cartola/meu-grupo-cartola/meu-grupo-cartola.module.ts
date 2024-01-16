import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { MeuGrupoCartolaComponent } from './meu-grupo-cartola.component';
import { CriaGrpoDialogComponent } from './cria-grupo-dialog/cria-grupo-dialog.component';
import { ImportaGrpoDialogComponent } from './importa-grupo-dialog/importa-grupo-dialog.component';


export const routes: Routes = [
  { path: '', component: MeuGrupoCartolaComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    MeuGrupoCartolaComponent,
    CriaGrpoDialogComponent,
    ImportaGrpoDialogComponent
  ]
})
export class MeuGrupoCartolaModule { }
