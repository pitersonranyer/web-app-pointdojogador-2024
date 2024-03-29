
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User_Point } from 'src/app/models/user_point';
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { ApiUsuarioService } from 'src/app/service/api.usuario';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from 'src/app/app.settings';
import { ImportaTimeFavoritoDialogComponent } from '../meu-time-cartola/importa-time-favorito-dialog/importa-time-favorito-dialog.component';
import { ResumoSaldoDialogComponent } from './resumo-saldo-dialog/resumo-saldo-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-participar-competicao-cartola',
  templateUrl: './participar-competicao-cartola.component.html',
  styleUrls: ['./participar-competicao-cartola.component.scss']
})
export class ParticiparCompeticaoCartolaComponent implements OnInit {

  times!: any[];
  public usuario: User_Point = <User_Point>{};
  usuario_id = 0;
  selectAll = false;
  public toggleSearchBar: boolean = false;
  filterText!: string;
  selecionar = false;
  timeFilter = [];
  timeSelecaoSalvar = [];
  competicao: any;
  count = 0;
  saldoUsuario = 0


  nomeUsuario = '';
  saldoAposPgto = 0;
  public settings: Settings;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiCartolaService: ApiCartolaService, public authService: AuthService, 
    private usuarioService: ApiUsuarioService, public dialog: MatDialog, 
    public appSettings: AppSettings, public snackBar: MatSnackBar) {
    this.settings = this.appSettings.settings;
    if (this.authService.currentUserPointValue) {
      this.usuario = this.authService.currentUserPointValue;
      this.usuario_id = this.usuario.id
    }
  }

  ngOnInit() {


    this.route.queryParams.subscribe(params => {
      this.competicao = params;
    });

    if (this.authService.currentUserPointValue) {
      this.listarMeusTimesFavoritos();
      this.recuperarDadosUsuario();
    }


  }

  recuperarDadosUsuario() {
    this.usuarioService.recuperarUsuario(this.authService.currentUserPointValue.email).subscribe((usuario: any) => {

      this.usuario = usuario;
      this.nomeUsuario = usuario.nome;
      this.saldoUsuario = usuario.saldo;

    });


  }

  listarMeusTimesFavoritos() {

    this.apiCartolaService.listaTimeFavoritoUsuarioCompeticao(this.usuario_id, this.competicao.competicao_liga_id)
      .subscribe((times) => {
        this.timeFilter = times;
        this.times = this.timeFilter;

        for (let i = 0; i < this.times.length; i++) {
          this.times[i].checked = false;
        }
      })
  }


  updateCheck() {

    if (this.selectAll === true) {
      for (let i = 0; i < this.times.length; i++) {
        if (!this.times[i].achou) {
          this.times[i].checked = true;
        }
      }

    } else {
      for (let i = 0; i < this.times.length; i++) {
        this.times[i].checked = false;
      }
    }
  }

  isAllSelected(evt: any, time: any) {

    if (evt.checked) {
      for (let i = 0; i < this.times.length; i++) {
        if (time.time_id === this.times[i].time_id) {
          this.times[i].checked = true;
        }
      }
    } else {
      for (let i = 0; i < this.times.length; i++) {
        if (time.time_id === this.times[i].time_id) {
          this.times[i].checked = false;
        }
      }

    }

  }



  salvarTimes() {

    this.count = 0
    this.timeSelecaoSalvar = [];

    for (let i = 0; i < this.times.length; i++) {
      if (this.times[i].checked) {
        this.timeSelecaoSalvar.push(this.times[i].time_id)
        this.count++
      }
    }

    let parmTimeCompeticao = {
      competicao_liga_id: this.competicao.competicao_liga_id,
      slugs: this.timeSelecaoSalvar,
    }


    let saldoWork = this.count * this.competicao.valor_competicao;


    let resumo = {
      usuario: this.usuario,
      qtde_time: this.count,
      saldoDev: this.usuario.saldo - saldoWork,
      saldoAtu: saldoWork,
    }


    this.alertSalvarTimes(resumo, parmTimeCompeticao);

  }

  alertSalvarTimes(resumo: any, parmTimeCompeticao: any) {
    const dialogRef = this.dialog.open(ResumoSaldoDialogComponent, {
      data: {
        resumo: resumo,
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.apiCartolaService.addTimeCompeticaoCartola(parmTimeCompeticao)
        .subscribe((add) => {
          if (add){
            this.snackBar.open('Times adicionados com sucesso.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.listarMeusTimesFavoritos();
            this.recuperarDadosUsuario();
          }
        });
      }
    });
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


  public openImportaDialog() {
    const dialogRef = this.dialog.open(ImportaTimeFavoritoDialogComponent, {
      data: {
        usuario_id: this.usuario_id,
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(importTimesFavoritos => {
      if (importTimesFavoritos) {

        let parm = {
          usuario_id: importTimesFavoritos.usuario_id,
          competicao_liga_id: this.competicao.competicao_liga_id,
          slugs: importTimesFavoritos.arraySlugs,
        }

        this.apiCartolaService.importarTimeFavoritoCompeticaoCartola(parm)
          .subscribe((retTimes) => {

            /* limpar possivel marcação. */
            for (let a = 0; a < this.times.length; a++) {
              this.times[a].checked = false;
            }


            for (let i = 0; i < retTimes.length; i++) {
              for (let x = 0; x < this.times.length; x++) {
                if (retTimes[i] === this.times[x].time_id) {
                  this.times[x].checked = true;
                }
              }
            }

          })

      }
    });
  }



}

