import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from 'src/app/app.settings';
import { CriaGrpoDialogComponent } from './cria-grupo-dialog/cria-grupo-dialog.component';
import { ImportaGrpoDialogComponent } from './importa-grupo-dialog/importa-grupo-dialog.component';
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { Router } from '@angular/router';


@Component({
  selector: 'app-meu-grupo-cartola',
  templateUrl: './meu-grupo-cartola.component.html',
  styleUrls: ['./meu-grupo-cartola.component.scss']
})
export class MeuGrupoCartolaComponent implements OnInit {

  grupos = [];

  public settings: Settings;
  constructor(public dialog: MatDialog,
    public appSettings: AppSettings,
    private apiCartolaService: ApiCartolaService,
    private router: Router) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {

    this.listarGruposUsuario();

  }


  listarGruposUsuario() {

    this.apiCartolaService.listarTodosGruposUsuario(1)
      .subscribe((resGrupos) => {

        this.grupos = resGrupos;

      })

  }

  excluirGrupo(grupo: any) {

    grupo.usuario_id = 1;

    this.apiCartolaService.excluirGrupoUsuario(grupo)
      .subscribe((retCadastro: any) => {
        this.listarGruposUsuario();
      });
  }




  public openCriaDialog() {
    const dialogRef = this.dialog.open(CriaGrpoDialogComponent, {
      data: {
        usuario_id: 1,
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

  public openImportaDialog(data: any) {
    const dialogRef = this.dialog.open(ImportaGrpoDialogComponent, {
      data: {
        category: data,
        categories: []
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(category => {
      if (category) {
        /*  const index: number = this.categories.findIndex(x => x.id == category.id);
          if(index !== -1){
            this.categories[index] = category;
          } 
          else{ 
            let last_category = this.categories[this.categories.length - 1]; 
            category.id = last_category.id + 1;
            this.categories.push(category);  
          } */
      }
    });
  }


  listarTimeGrupoCartola(grupo: any){
  
    this.router.navigate(['/listarTimeGrupoCartola'],  { queryParams: grupo } );

  } 

}
