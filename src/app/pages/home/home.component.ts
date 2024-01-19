import { Component, OnInit } from '@angular/core';
import { Product } from "../../app.models";
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { UtilService } from 'src/app/service/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  
  partidas = [];
  grupos = [];

  constructor(private apiCartolaService: ApiCartolaService,
    private ordernar: UtilService,    
    private router: Router
  ) { }

  ngOnInit() {

    this.listarPartidas();
    this.listarGruposUsuario();
    
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


  listarTimeGrupoCartola(grupo: any) {

    this.router.navigate(['/listarTimeGrupoCartola'], { queryParams: grupo });

  }

}
