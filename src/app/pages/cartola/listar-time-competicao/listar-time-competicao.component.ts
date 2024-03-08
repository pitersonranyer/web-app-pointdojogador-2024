import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCartolaService } from 'src/app/service/api.cartola';



@Component({
  selector: 'app-listar-time-competicao',
  templateUrl: './listar-time-competicao.component.html',
  styleUrls: ['./listar-time-competicao.component.scss']
})
export class ListarTimeCompeticaoComponent implements OnInit {


  times = [];
  timeFilter = [];
  filterText!: string;
  competicao: any;
  public toggleSearchBar: boolean = false;
  slug = [];

  constructor( private router: Router,
    private route: ActivatedRoute,
    private apiCartolaService: ApiCartolaService,) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.competicao = params;      
    });

    this.listarTimeCompeticao();
  }

  
  listarTimeCompeticao(){

    this.apiCartolaService.listarTimeCompeticao(this.competicao.competicao_liga_id)
      .subscribe((timeCompeticao) => {
        this.timeFilter = timeCompeticao;
        this.times = this.timeFilter;
        this.times = timeCompeticao;
      })
  } 


  listarAtletaTime(time: any, index: number) {
    time.posicao = index + 1;

    this.router.navigate(['/atletaTimeCartola'], { queryParams: time });

  }

  filterData() {
    this.times = this.timeFilter.filter(
      (item: { nome: string }) => {
        return (
          item.nome.toLowerCase().includes(this.filterText.toLowerCase())
        );
      }
    );
  }

  exportarTimes() {
    for (let i = 0; i < this.times.length; i++) {
      this.slug[i] = this.times[i].time_id
    }
    let grupo = this.competicao.nome_liga + ' - RDD ' + this.competicao.rodada_fim + ' =>' + this.slug.join(';');
    navigator.clipboard.writeText(grupo);
  }


}
