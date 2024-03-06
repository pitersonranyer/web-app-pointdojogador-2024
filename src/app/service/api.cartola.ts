
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

  buscarTimesPorNomeGrupo(grupo_id: number, nomeTime: string): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/grupoCartola/buscarTimesPorNomeGrupo/${grupo_id}/${nomeTime}`;
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

  importarGrupoCartola(parm: any) {
    const url = this.utilService.getUrlBackend() + `/grupoCartola/importarGrupoCartola`;
    return this.http.post<any[]>(url, parm);
  }

 
  listarTimeGrupoUsuario(grupo_id: number, usuario_id: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/grupoCartola/listarTimeGrupoUsuario/${grupo_id}/${usuario_id}`;
    return this.http.get<any[]>(url);
  }


  addTimeGrupo(parm: any) {
    const url = this.utilService.getUrlBackend() + `/grupoCartola/addTimeGrupo`;
    return this.http.post<any>(url, parm);
  }

  listarParciaisAtletasMercadoAberto(time_id: number) {
    const url = this.utilService.getUrlBackend() + `/cartolaAPI/listarParciaisAtletasMercadoAberto/${time_id}`;
    return this.http.get<any[]>(url);
  }

  buscarTimesFavoritoPorNome(nomeTime: string): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/timeFavorito/listarTimesFavoritoPorNome/${nomeTime}`;
    return this.http.get<any[]>(url);
  }

  addTimeFavoritoCartola(parm: any) {
    const url = this.utilService.getUrlBackend() + `/timeFavorito/cadastrarTimeFavoritoCartola`;
    return this.http.post<any>(url, parm);
  }

  listarTimeFavoritoUsuario(usuario_id: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/timeFavorito/listarTimeFavoritoUsuario/${usuario_id}`;
    return this.http.get<any[]>(url);
  }

  importarTimeFavoritoCartola(parm: any) {
    const url = this.utilService.getUrlBackend() + `/timeFavorito/importarTimeFavoritoCartola`;
    return this.http.post<any[]>(url, parm);
  }

  excluirTimeFavorito(grupo: any) {
    const url = this.utilService.getUrlBackend() + `/timeFavorito/excluirTimeFavorito`;
    return this.http.put<any>(url, grupo);
  }


  listarLigasCartola(): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/ligaCartola/listarTodasLigas`;
    return this.http.get<any[]>(url);
  }

  cadastrarCompeticaoLigaCartola(grupo: any) {
    const url = this.utilService.getUrlBackend() + `/competicaoLigaCartola/cadastrarCompeticaoLigaCartola`;
    return this.http.post<any>(url, grupo);
  }

  listarCompeticaoLiga(liga_id: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/competicaoLigaCartola/listarCompeticaoLiga/${liga_id}`;
    return this.http.get<any[]>(url);
  }

  listarLigaUsuario(usuario_id: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/ligaCartola/listarLigaUsuario/${usuario_id}`;
    return this.http.get<any[]>(url);
  }

  listarCompeticaoLigaVitrine(liga_id: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/competicaoLigaCartola/listarCompeticaoLigaVitrine/${liga_id}`;
    return this.http.get<any[]>(url);
  }

  importarTimeFavoritoCompeticaoCartola(parm: any) {
    const url = this.utilService.getUrlBackend() + `/competicaoLigaCartola/importarTimeFavoritoCompeticaoCartola`;
    return this.http.post<any[]>(url, parm);
  }

  addTimeCompeticaoCartola(parm: any) {
    const url = this.utilService.getUrlBackend() + `/competicaoLigaCartola/addTimeCompeticaoCartola`;
    return this.http.post<any[]>(url, parm);
  }

  listaTimeFavoritoUsuarioCompeticao(usuario_id: number, competicao_liga_id: number): Observable<any[]> {
    const url = this.utilService.getUrlBackend() + `/competicaoLigaCartola/listaTimeFavoritoUsuarioCompeticao/${usuario_id}/${competicao_liga_id}`;
    return this.http.get<any[]>(url);
  }

}