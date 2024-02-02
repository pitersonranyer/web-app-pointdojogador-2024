import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCartolaService } from 'src/app/service/api.cartola';


@Component({
  selector: 'app-atleta-time-cartola',
  templateUrl: './atleta-time-cartola.component.html',
  styleUrls: ['./atleta-time-cartola.component.scss']
})
export class AtletaTimeCartolaComponent implements OnInit {
 
  time: any;
  timeCompleto: any;
  atletas = [];
  atletasReserva = [];
  posicao = 0

   constructor(  private route: ActivatedRoute,
    private apiCartolaService: ApiCartolaService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.time = params;
      this.posicao = this.time.posicao;
    });
   
    this.listarAtletasTimeCartola(this.time);

  }


  listarAtletasTimeCartola(time: any){
    this.apiCartolaService.listarParciaisAtletasMercadoAberto(time.time_id)
      .subscribe((atletas) => {
        this.timeCompleto = atletas;
        this.atletas = this.timeCompleto.titulares;
        this.atletasReserva = this.timeCompleto.reservas;
      })
  } 
  

}
