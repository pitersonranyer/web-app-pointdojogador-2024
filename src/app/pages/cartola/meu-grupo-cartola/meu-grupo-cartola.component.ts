import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from 'src/app/app.settings';
import { CriaGrpoDialogComponent } from './cria-grupo-dialog/cria-grupo-dialog.component';
import { ImportaGrpoDialogComponent } from './importa-grupo-dialog/importa-grupo-dialog.component';


@Component({
  selector: 'app-meu-grupo-cartola',
  templateUrl: './meu-grupo-cartola.component.html',
  styleUrls: ['./meu-grupo-cartola.component.scss']
})
export class MeuGrupoCartolaComponent implements OnInit {
 

  public settings:Settings;
  constructor(public dialog: MatDialog, public appSettings:AppSettings) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
   
   
  }


  public openCriaDialog(data:any){
    const dialogRef = this.dialog.open(CriaGrpoDialogComponent, {
      data: {
        category: data,
        categories: []
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(category => { 
       if(category){    
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

  public openImportaDialog(data:any){
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
       if(category){    
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
  

}
