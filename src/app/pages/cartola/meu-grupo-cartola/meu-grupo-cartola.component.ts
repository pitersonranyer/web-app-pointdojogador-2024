import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from 'src/app/app.settings';
import { CriaGrpoDialogComponent } from './cria-grupo-dialog/cria-grupo-dialog.component';
import { ImportaGrpoDialogComponent } from './importa-grupo-dialog/importa-grupo-dialog.component';
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User_Point } from 'src/app/models/user_point';


@Component({
  selector: 'app-meu-grupo-cartola',
  templateUrl: './meu-grupo-cartola.component.html',
  styleUrls: ['./meu-grupo-cartola.component.scss']
})
export class MeuGrupoCartolaComponent implements OnInit {

  grupos = [];
  usuario_id = 0;
  public usuario: User_Point = <User_Point>{};

  public settings: Settings;
  constructor(public dialog: MatDialog,
    public appSettings: AppSettings,
    public authService: AuthService,
    private apiCartolaService: ApiCartolaService,
    private router: Router) {
    this.settings = this.appSettings.settings;
    if (this.authService.currentUserPointValue) {
      this.usuario = this.authService.currentUserPointValue;
      this.usuario_id = this.usuario.id
    }
  }

  ngOnInit() {

    this.listarGruposUsuario();

  }


  listarGruposUsuario() {

    this.apiCartolaService.listarTodosGruposUsuario(this.usuario_id)
      .subscribe((resGrupos) => {

        this.grupos = resGrupos;

      })

  }

  excluirGrupo(grupo: any) {

    grupo.usuario_id = this.usuario_id;

    this.apiCartolaService.excluirGrupoUsuario(grupo)
      .subscribe((retCadastro: any) => {
        this.listarGruposUsuario();
      });
  }




  public openCriaDialog() {
    const dialogRef = this.dialog.open(CriaGrpoDialogComponent, {
      data: {
        usuario_id: this.usuario_id,
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(grupo => {
      if (grupo) {
        this.listarGruposUsuario();
      }
    });
  }

  public openImportaDialog() {
    const dialogRef = this.dialog.open(ImportaGrpoDialogComponent, {
      data: {
        usuario_id: this.usuario_id,
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(importGroup => {
      if (importGroup) {
   
        let parm = {
          grupo_id: importGroup.grupo_id,
          nome_grupo: importGroup.nome_grupo,
          usuario_id: importGroup.usuario_id,
          slugs:  importGroup.arraySlugs,
        }

        this.apiCartolaService.importarGrupoCartola(parm)
          .subscribe(() => {
            this.listarGruposUsuario();
          })
        
      }
    });
  }


  listarTimeGrupoCartola(grupo: any) {

    this.router.navigate(['/listarTimeGrupoCartola'], { queryParams: grupo });

  }

}
