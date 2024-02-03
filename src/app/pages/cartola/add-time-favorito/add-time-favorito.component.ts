import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCartolaService } from 'src/app/service/api.cartola';


@Component({
  selector: 'add-time-favorito',
  templateUrl: './add-time-favorito.component.html',
  styleUrls: ['./add-time-favorito.component.scss']
})
export class AddTimeFavoritoComponent implements OnInit {
 
  nomeTime = '';
  times = [];
  
  constructor(private apiCartolaService: ApiCartolaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

     
   
  }

  listarTimesPorNome() {

    let nomeTimeSemAcento = this.nomeTime.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    this.apiCartolaService.buscarTimesFavoritoPorNome(nomeTimeSemAcento)
      .subscribe((listaTimes) => {
        this.times = listaTimes;
      });

  }

 
  addTimeFavorito(time: any){

    time.usuario_id = 1;

     this.apiCartolaService.addTimeFavoritoCartola(time)
      .subscribe(() => {
        for (let i = 0; i < this.times.length; i++) {
          if (time.time_id === this.times[i].time_id) {
            this.times[i].inPoint = true;
          }
        }
      }); 

  } 

  

}
