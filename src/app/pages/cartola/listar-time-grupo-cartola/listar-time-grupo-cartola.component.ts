import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-listar-time-grupo-cartola',
  templateUrl: './listar-time-grupo-cartola.component.html',
  styleUrls: ['./listar-time-grupo-cartola.component.scss']
})
export class ListarTimeGrupoCartolaComponent implements OnInit {

  grupo: any;
  nome_grupo = ''
 
  constructor( private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.grupo = params;
      this.nome_grupo = this.grupo.nome_grupo;
    });
   
   
  }

  
  addTimeGrupo(){
  
    this.router.navigate(['/addTimeGrupoCartola'],  { queryParams: this.grupo } );

  } 

}
