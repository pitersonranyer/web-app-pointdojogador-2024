import { Component, OnInit } from '@angular/core';
import { ApiCartolaService } from 'src/app/service/api.cartola';


@Component({
  selector: 'app-atleta-provavel',
  templateUrl: './atleta-provavel.component.html',
  styleUrls: ['./atleta-provavel.component.scss']
})
export class AtletaProvavelComponent implements OnInit {

  provaveis = [];

  constructor(private apiCartolaService: ApiCartolaService) { }

  ngOnInit() {

    this.listarAtletasProvaveis();

  }

  listarAtletasProvaveis() {

    this.apiCartolaService.listarAtletasProvaveis()
      .subscribe((provaveis) => {
        this.provaveis = provaveis;
      })

  }



}
