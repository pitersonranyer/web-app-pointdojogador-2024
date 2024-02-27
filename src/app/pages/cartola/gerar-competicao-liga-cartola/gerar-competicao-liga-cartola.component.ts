import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddCompeticaoDialogComponent } from './add-competicao-dialog/add-competicao-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from 'src/app/app.settings';
import { ApiCartolaService } from 'src/app/service/api.cartola';


@Component({
  selector: 'app-gerar-competicao-liga-cartola',
  templateUrl: './gerar-competicao-liga-cartola.component.html',
  styleUrls: ['./gerar-competicao-liga-cartola.component.scss']
})
export class GerarCompeticaoLigaCartolaComponent implements OnInit {

  competicao: any;
  liga_id = 0;
  nome_liga = '';
  path_image = '';
  public settings: Settings;
  competicoes = [];

  constructor(private route: ActivatedRoute, public dialog: MatDialog, public appSettings: AppSettings,
    private apiCartolaService: ApiCartolaService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.competicao = params;
      this.nome_liga = this.competicao.nome_liga
      this.path_image = this.competicao.path_image
    });


    this.listarCompeticaoLiga();
  }


  listarCompeticaoLiga() {

    this.liga_id = this.competicao.liga_id;

    this.apiCartolaService.listarCompeticaoLiga(this.liga_id)
      .subscribe((resCompeticao) => {
        this.competicoes = resCompeticao;
      })

  }


  public openCouponDialog(data: any) {

    const dialogRef = this.dialog.open(AddCompeticaoDialogComponent, {
      data: {
        data_parm_competicao: data,
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(dadosCompeticao => {
      if (dadosCompeticao) {

        if (dadosCompeticao.competicao_liga_id === null || dadosCompeticao.competicao_liga_id === undefined) {
          dadosCompeticao.competicao_liga_id = 0;
        }

        dadosCompeticao.liga_id = this.competicao.liga_id;
        
        /* cadastrar ou alterar competição */
        this.apiCartolaService.cadastrarCompeticaoLigaCartola(dadosCompeticao)
          .subscribe(() => {
            this.listarCompeticaoLiga();
          })

      }
    });
  }




}
