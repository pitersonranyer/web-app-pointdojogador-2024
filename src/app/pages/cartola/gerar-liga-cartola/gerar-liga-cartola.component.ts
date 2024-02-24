import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ApiCartolaService } from 'src/app/service/api.cartola';


@Component({
  selector: 'app-gerar-liga-cartola',
  templateUrl: './gerar-liga-cartola.component.html',
  styleUrls: ['./gerar-liga-cartola.component.scss']
})
export class GerarLigaCartolaComponent implements OnInit {
 

  usuario_id = 0;
  liga: any;
  ligas = [];
  constructor( private apiCartolaService: ApiCartolaService, private router: Router) { 
    
  }

  ngOnInit() {


     this.listarLigaUsuario();
  }


  listarLigaUsuario() {

    this.usuario_id = 1;

    this.apiCartolaService.listarLigaUsuario(this.usuario_id)
      .subscribe((resCompeticao) => {
        this.ligas = resCompeticao;

      })

  }

  gerarCompeticaoLigaCartola(liga: any) {

    this.router.navigate(['/gerarCompeticaoLigaCartola'], { queryParams: liga });

  }
     
   

}
