import { Component, OnInit } from '@angular/core';
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { UtilService } from 'src/app/service/util.service';


@Component({
  selector: 'app-jogos-cartola',
  templateUrl: './jogos-cartola.component.html',
  styleUrls: ['./jogos-cartola.component.scss']
})
export class JogosCartolaComponent implements OnInit {
 
  partidas = [];

  constructor(private apiCartolaService: ApiCartolaService,
    private ordernar: UtilService,    
  ) { }

  ngOnInit() {

    this.listarPartidas()
   
  }

  listarPartidas() {

    this.apiCartolaService.listarPartidasRodada()
      .subscribe((resPartidas) => {
        
        this.partidas = this.ordernar.ordenarObjetoArray(resPartidas, 'partida_data');
       
      })

  }
  

}
