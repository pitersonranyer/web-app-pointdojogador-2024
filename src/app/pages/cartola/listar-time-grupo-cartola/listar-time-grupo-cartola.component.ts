import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCartolaService } from 'src/app/service/api.cartola';


@Component({
  selector: 'app-listar-time-grupo-cartola',
  templateUrl: './listar-time-grupo-cartola.component.html',
  styleUrls: ['./listar-time-grupo-cartola.component.scss']
})
export class ListarTimeGrupoCartolaComponent implements OnInit {

  grupo: any;
  nome_grupo = ''
  grupo_id = 0
  usuario_id = 0
  times = [];
 
  constructor( private router: Router,
    private route: ActivatedRoute,
    private apiCartolaService: ApiCartolaService,) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.grupo = params;
      this.nome_grupo = this.grupo.nome_grupo;
      this.grupo_id = this.grupo.grupo_id;
      this.usuario_id = this.grupo.usuario_id;
    });

    this.listarTimeGrupoUsuario();
  }

  addTimeGrupo(){
    this.router.navigate(['/addTimeGrupoCartola'],  { queryParams: this.grupo } );
  } 

  listarTimeGrupoUsuario(){
    this.apiCartolaService.listarTimeGrupoUsuario(this.grupo_id, this.usuario_id)
      .subscribe((timeGrupo) => {
        this.times = timeGrupo;
      })
  } 
}
