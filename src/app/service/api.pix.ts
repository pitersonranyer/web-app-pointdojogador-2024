import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ApiPixService {

  constructor(private http: HttpClient, private utilService: UtilService) { }


  gerarQrCode(valorPix: number, descPix: string, uid: string): Observable<any> {
    const url = this.utilService.getUrlBackend() + `/pagamento/gerarCobrancaPix/${valorPix}/${descPix}/${uid}`;
    return this.http.get<any>(url)
  }


  sendSubscriptionToTheServer(subscription: PushSubscription) {
    const url = this.utilService.getUrlBackend() + `pix`;
    return this.http.post(url, subscription)
      .subscribe((response) => {
        console.log(response);
      });
  }

  /* notificacaoRecPixGerencianet(fake: any) {



    const url = this.utilService.getUrlBackend() + `pix`;


    return this.http.post(url, JSON.stringify(fake))
      .subscribe((response) => {
        console.log(response);
      });

  } */


}