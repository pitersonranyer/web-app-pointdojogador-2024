import { Component, OnInit } from '@angular/core';
import { Product } from "../../app.models";
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { UtilService } from 'src/app/service/util.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User_Point } from 'src/app/models/user_point';
import { SwiperConfigInterface } from 'src/app/theme/components/swiper/swiper.module';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  times = [];
  usuario_id = 0;
  partidas = [];
  grupos = [];
  ligas = [];
  provaveis = [];
  public usuario: User_Point = <User_Point>{};
  public config: SwiperConfigInterface = {};
  emailVerified: boolean;

  constructor(private apiCartolaService: ApiCartolaService,
    private ordernar: UtilService,
    private router: Router,
    public authService: AuthService,

  ) {
    if (this.authService.currentUserValue) {
      this.emailVerified = this.authService.currentUserValue.emailVerified;
    } else {
      this.emailVerified = false
    }

    if (this.emailVerified) {
      if (this.authService.currentUserPointValue) {
        this.usuario = this.authService.currentUserPointValue;
        this.usuario_id = this.usuario.id
      }
    }

  }

  ngOnInit() {

    this.listarPartidas();
    this.listarLigasCartola();
    this.listarAtletasProvaveis();

    if (this.usuario_id != 0) {
      this.listarGruposUsuario();
      this.listarTimeGrupoUsuario();
    }

  }

  public listarLigasCartola() {
    this.apiCartolaService.listarLigasCartola()
      .subscribe((resLigas) => {
        this.ligas = resLigas;
      })

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

  listarAtletasProvaveis(){

    this.apiCartolaService.listarAtletasProvaveis()
      .subscribe((provaveis) => {
        this.provaveis = provaveis;
      })

  }




  ngAfterViewInit() {
    this.config = {
      slidesPerView: 7,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide",
      breakpoints: {
        240: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        },
        /* 600: {
          slidesPerView: 3
        },
        960: {
          slidesPerView: 4
        },
        1280: {
          slidesPerView: 5
        },
        1500: {
          slidesPerView: 6
        } */
      }
    }
  }


}
