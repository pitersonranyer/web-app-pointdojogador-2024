import { Component, OnInit } from '@angular/core';
import { ApiCartolaService } from 'src/app/service/api.cartola';


@Component({
  selector: 'app-meu-time-cartola',
  templateUrl: './meu-time-cartola.component.html',
  styleUrls: ['./meu-time-cartola.component.scss']
})
export class MeuTimeCartolaComponent implements OnInit {
 
  times = [];
  usuario_id = 1;

  constructor(private apiCartolaService: ApiCartolaService) { }

  ngOnInit() {
   
    this.listarTimeGrupoUsuario();
   
  }

  listarTimeGrupoUsuario(){
    this.apiCartolaService.listarTimeFavoritoUsuario(this.usuario_id)
      .subscribe((times) => {
        this.times = times;
      })
  } 

  

}
