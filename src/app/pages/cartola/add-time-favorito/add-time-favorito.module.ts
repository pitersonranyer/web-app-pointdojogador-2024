import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AddTimeFavoritoComponent } from './add-time-favorito.component';
import { bearerTokenInterceptor } from 'src/app/interceptadores/bearer-token.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';





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
  ],
  providers: [
   
    provideHttpClient(withInterceptors([bearerTokenInterceptor])),
    
  ],
})
export class AddTimeFavoritoModule { }
