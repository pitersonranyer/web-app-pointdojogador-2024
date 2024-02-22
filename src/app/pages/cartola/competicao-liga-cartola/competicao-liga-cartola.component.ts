import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-competicao-liga-cartola',
  templateUrl: './competicao-liga-cartola.component.html',
  styleUrls: ['./competicao-liga-cartola.component.scss']
})
export class CompeticaoLigaCartolaComponent implements OnInit {
 
  competicao: any;
  nome_liga = '';
  path_image = '';

  constructor( private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      this.competicao = params;
      this.nome_liga = this.competicao.nome_liga
      this.path_image = this.competicao.path_image
    });

  
   
  }

  

  

}
