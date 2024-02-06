
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User_Point } from '../models/user_point';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ApiUsuarioService {

    constructor(private http: HttpClient, private utilService: UtilService) { }

    cadastrarUserPoint(user: User_Point) {
      const url = this.utilService.getUrlBackend() + `/usuarios`;
      return this.http.post(url, user);
    }


    recuperarUsuario(email: string): Observable<any> {
      const url = this.utilService.getUrlBackend() + `/usuarios/recuperarUsuario/${email}`;
      return this.http.get<any>(url)
    }

    atualizarSaldoUsuario(user: User_Point) {
      const url = this.utilService.getUrlBackend() + `/usuarios/atualizarSaldoUsuario`;
      return this.http.put(url, user)
    }

    debitarSaldoUsuario(user: User_Point) {
      const url = this.utilService.getUrlBackend() + `/usuarios/debitarSaldoUsuario`;
      return this.http.put(url, user)
    }

  }