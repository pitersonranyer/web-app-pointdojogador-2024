import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCartolaService } from 'src/app/service/api.cartola';


@Component({
  selector: 'app-add-time-grupo-cartola',
  templateUrl: './add-time-grupo-cartola.component.html',
  styleUrls: ['./add-time-grupo-cartola.component.scss']
})
export class AddTimeGrupoCartolaComponent implements OnInit {
 
  nomeTime = '';
  times = [];
  nome_grupo = '';
  grupo: any;

  constructor(private listarTimesCartola: ApiCartolaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.grupo = params;
      this.nome_grupo = this.grupo.nome_grupo;
    });
   
   
  }

  listarTimesPorNome() {


    let nomeTimeSemAcento = this.nomeTime.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    this.listarTimesCartola.listarTimesCartolaPorNome(nomeTimeSemAcento)
      .subscribe((listaTimes) => {
        this.times = listaTimes;
      });

  }

  listarTimeGrupoCartola(){
  
    this.router.navigate(['/listarTimeGrupoCartola'],  { queryParams: this.grupo } );

  } 



}
