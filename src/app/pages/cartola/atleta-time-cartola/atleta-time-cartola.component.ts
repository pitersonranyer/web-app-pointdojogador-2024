import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCartolaService } from 'src/app/service/api.cartola';


@Component({
  selector: 'app-atleta-time-cartola',
  templateUrl: './atleta-time-cartola.component.html',
  styleUrls: ['./atleta-time-cartola.component.scss']
})
export class AtletaTimeCartolaComponent implements OnInit {
 
  time: any;
  atletas = [];
  constructor(  private route: ActivatedRoute,
    private apiCartolaService: ApiCartolaService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.time = params;
    });
   
    this.listarAtletasTimeCartola(this.time);

  }


  listarAtletasTimeCartola(time: any){
    this.apiCartolaService.listarParciaisAtletasMercadoAberto(time.time_id)
      .subscribe((atletas) => {
        this.atletas = atletas;
      })
  } 
  

}
