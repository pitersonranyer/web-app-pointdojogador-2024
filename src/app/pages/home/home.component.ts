import { Component, OnInit } from '@angular/core';
import { Product } from "../../app.models";
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { UtilService } from 'src/app/service/util.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 
  times = [];
  usuario_id = 1;
  partidas = [];
  grupos = [];

  constructor(private apiCartolaService: ApiCartolaService,
    private ordernar: UtilService,    
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {

    this.listarPartidas();
    this.listarGruposUsuario();
    this.listarTimeGrupoUsuario()
    
  }

  listarPartidas() {

    this.apiCartolaService.listarPartidasRodada()
      .subscribe((resPartidas) => {
        
        this.partidas = this.ordernar.ordenarObjetoArray(resPartidas, 'partida_data');
       
      })

  }

  listarGruposUsuario() {

    this.apiCartolaService.listarTodosGruposUsuario(1)
      .subscribe((resGrupos) => {

        this.grupos = resGrupos;

      })

  }

  listarTimeGrupoUsuario(){
    this.apiCartolaService.listarTimeFavoritoUsuario(this.usuario_id)
      .subscribe((times) => {
        this.times = times;
      })
  } 


  listarTimeGrupoCartola(grupo: any) {

    this.router.navigate(['/listarTimeGrupoCartola'], { queryParams: grupo });

  }

}
