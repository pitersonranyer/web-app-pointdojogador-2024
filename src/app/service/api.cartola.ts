
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

  listarTimesCartolaPorNome(nomeTime: string): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/ListarTimeCartolaListNome/${nomeTime}`;
    return this.http.get<any[]>(url);
  }

  listarTodosGruposUsuario(usuario_id: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/grupoCartola/listarTodosGruposUsuario/${usuario_id}`;
    return this.http.get<any[]>(url);
  }


  excluirGrupoUsuario(grupo: any) {
    const url = this.utilService.getUrlBackend() + `/grupoCartola/excluirGrupoCartola`;
    return this.http.put<any>(url, grupo);
  }

  cadastrarGrupoUsuario(grupo: any) {
    const url = this.utilService.getUrlBackend() + `/grupoCartola/cadastrarGrupoCartola`;
    return this.http.post<any>(url, grupo);
  }

  /*     listartTimeCartolaListId(slugs: any) {
        const url = this.utilService.getUrlBackend() + `/cartolaAPI/listartTimeCartolaListId`;
        return this.http.post<any[]>(url, slugs);
      }
 */

  importarGrupoCartola(parm: any) {
    const url = this.utilService.getUrlBackend() + `/grupoCartola/importarGrupoCartola`;
    return this.http.post<any[]>(url, parm);
  }


  
  listarTimeGrupoUsuario(grupo_id: number, usuario_id: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/grupoCartola/listarTimeGrupoUsuario/${grupo_id}/${usuario_id}`;
    return this.http.get<any[]>(url);
  }

}