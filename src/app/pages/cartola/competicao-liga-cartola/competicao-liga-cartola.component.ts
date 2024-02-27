import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCartolaService } from 'src/app/service/api.cartola';



@Component({
  selector: 'app-competicao-liga-cartola',
  templateUrl: './competicao-liga-cartola.component.html',
  styleUrls: ['./competicao-liga-cartola.component.scss']
})
export class CompeticaoLigaCartolaComponent implements OnInit {
 
  competicao: any;
  competicoes = [];

  constructor( private route: ActivatedRoute, private apiCartolaService: ApiCartolaService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.competicao = params;
    });

    this.listarCompeticaoLigaVitrine()
   
  }

  
  listarCompeticaoLigaVitrine() {

    this.apiCartolaService.listarCompeticaoLigaVitrine(this.competicao.liga_id)
      .subscribe((competicaoes) => {
        this.competicoes = competicaoes;
      })

  }
  

}
