import { Component, OnInit } from '@angular/core';
import { ApiCartolaService } from 'src/app/service/api.cartola';


@Component({
  selector: 'app-add-time-grupo-cartola',
  templateUrl: './add-time-grupo-cartola.component.html',
  styleUrls: ['./add-time-grupo-cartola.component.scss']
})
export class AddTimeGrupoCartolaComponent implements OnInit {
 
  nomeTime = '';
  times = [];

  constructor(private listarTimesCartola: ApiCartolaService) { }

  ngOnInit() {
   
   
  }

  listarTimesPorNome() {


    let nomeTimeSemAcento = this.nomeTime.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    this.listarTimesCartola.listarTimesCartolaPorNome(nomeTimeSemAcento)
      .subscribe((listaTimes) => {
        this.times = listaTimes;
        console.log(this.times)
      });

  }


}
