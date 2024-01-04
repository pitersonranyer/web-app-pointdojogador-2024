
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
  })
  export class ApiCartolaService {

    constructor(private http: HttpClient, private utilService: UtilService) { }


      listarPartidasRodada(): Observable<any[]> {
        const url = this.utilService.getUrlBackend() + `/cartolaAPI/listarPartidasRodada`;
        return this.http.get<any[]>(url);
      }
     

  }