import { Component, OnInit } from '@angular/core';
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { ImportaTimeFavoritoDialogComponent } from './importa-time-favorito-dialog/importa-time-favorito-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from 'src/app/app.settings';
import { AuthService } from 'src/app/service/auth.service';
import { User_Point } from 'src/app/models/user_point';


@Component({
  selector: 'app-meu-time-cartola',
  templateUrl: './meu-time-cartola.component.html',
  styleUrls: ['./meu-time-cartola.component.scss']
})
export class MeuTimeCartolaComponent implements OnInit {

  times = [];
  public usuario: User_Point = <User_Point>{};
  usuario_id = 0;

  public settings: Settings;
  constructor(private apiCartolaService: ApiCartolaService,
    public dialog: MatDialog,
    public appSettings: AppSettings,
    public authService: AuthService,
  ) {
    this.settings = this.appSettings.settings;
    this.usuario = this.authService.currentUserPointValue;
    this.usuario_id = this.usuario.id
  }


  ngOnInit() {


    this.listarMeusTimesFavoritos();

  }

  listarMeusTimesFavoritos() {
    this.apiCartolaService.listarTimeFavoritoUsuario(this.usuario_id)
      .subscribe((times) => {
        this.times = times;
      })
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
          slugs: importTimesFavoritos.arraySlugs,
        }

        this.apiCartolaService.importarTimeFavoritoCartola(parm)
          .subscribe(() => {
            this.listarMeusTimesFavoritos();
          })

      }
    });
  }

  public excluirTimeFavorito(time: any) {

    time.usuario_id = this.usuario_id;

    this.apiCartolaService.excluirTimeFavorito(time)
      .subscribe(() => {
        this.listarMeusTimesFavoritos();
      });
  }


}
