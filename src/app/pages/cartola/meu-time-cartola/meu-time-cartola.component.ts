import { Component, OnInit } from '@angular/core';
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { ImportaTimeFavoritoDialogComponent } from './importa-time-favorito-dialog/importa-time-favorito-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from 'src/app/app.settings';


@Component({
  selector: 'app-meu-time-cartola',
  templateUrl: './meu-time-cartola.component.html',
  styleUrls: ['./meu-time-cartola.component.scss']
})
export class MeuTimeCartolaComponent implements OnInit {
 
  times = [];
  usuario_id = 1;

  public settings: Settings;
  constructor(private apiCartolaService: ApiCartolaService,
    public dialog: MatDialog,
    public appSettings: AppSettings,) { this.settings = this.appSettings.settings; }
    

  ngOnInit() {
   
    this.listarMeusTimesFavoritos();
   
  }

  listarMeusTimesFavoritos(){
    this.apiCartolaService.listarTimeFavoritoUsuario(this.usuario_id)
      .subscribe((times) => {
        this.times = times;
      })
  } 

  public openImportaDialog() {
    const dialogRef = this.dialog.open(ImportaTimeFavoritoDialogComponent, {
      data: {
        usuario_id: 1,
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(importTimesFavoritos => {
      if (importTimesFavoritos) {
   
        let parm = {
          usuario_id: importTimesFavoritos.usuario_id,
          slugs:  importTimesFavoritos.arraySlugs,
        }

        this.apiCartolaService.importarTimeFavoritoCartola(parm)
          .subscribe(() => {
            this.listarMeusTimesFavoritos();
          })
        
      }
    });
  }

  public excluirTimeFavorito(time: any){

    time.usuario_id = 1;

    this.apiCartolaService.excluirTimeFavorito(time)
      .subscribe(() => {
        this.listarMeusTimesFavoritos();
      });
  }
  

}
