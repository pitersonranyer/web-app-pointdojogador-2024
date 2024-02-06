import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User_Point } from 'src/app/models/user_point';
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'add-time-favorito',
  templateUrl: './add-time-favorito.component.html',
  styleUrls: ['./add-time-favorito.component.scss']
})
export class AddTimeFavoritoComponent implements OnInit {
 
  nomeTime = '';
  times = [];
  public usuario: User_Point = <User_Point>{};
  usuario_id = 0;
  
  constructor(private apiCartolaService: ApiCartolaService,
    public authService: AuthService ) 
    
    { 
      this.usuario = this.authService.currentUserPointValue;
      this.usuario_id = this.usuario.id 
    }

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

    time.usuario_id = this.usuario_id;

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
