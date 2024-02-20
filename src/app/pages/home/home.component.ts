import { Component, OnInit } from '@angular/core';
import { Product } from "../../app.models";
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { UtilService } from 'src/app/service/util.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User_Point } from 'src/app/models/user_point';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public brands = [];

  times = [];
  usuario_id = 0;
  partidas = [];
  grupos = [];
  public usuario: User_Point = <User_Point>{};

  constructor(private apiCartolaService: ApiCartolaService,
    private ordernar: UtilService,
    private router: Router,
    public authService: AuthService,
    public appService: AppService
  ) {
    if (this.authService.currentUserPointValue) {
      this.usuario = this.authService.currentUserPointValue;
      this.usuario_id = this.usuario.id
    }
  }

  ngOnInit() {

    this.listarPartidas();
    this.listarGruposUsuario();
    this.listarTimeGrupoUsuario();
    this.getBrands();

  }

  

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

  listarPartidas() {

    this.apiCartolaService.listarPartidasRodada()
      .subscribe((resPartidas) => {

        this.partidas = this.ordernar.ordenarObjetoArray(resPartidas, 'partida_data');

      })

  }

  listarGruposUsuario() {

    this.apiCartolaService.listarTodosGruposUsuario(this.usuario_id)
      .subscribe((resGrupos) => {

        this.grupos = resGrupos;

      })

  }

  listarTimeGrupoUsuario() {
    this.apiCartolaService.listarTimeFavoritoUsuario(this.usuario_id)
      .subscribe((times) => {
        this.times = times;
      })
  }


  listarTimeGrupoCartola(grupo: any) {

    this.router.navigate(['/listarTimeGrupoCartola'], { queryParams: grupo });

  }

}
