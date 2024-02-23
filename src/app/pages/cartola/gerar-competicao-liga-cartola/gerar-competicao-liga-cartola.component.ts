import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddCompeticaoDialogComponent } from './add-competicao-dialog/add-competicao-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from 'src/app/app.settings';


@Component({
  selector: 'app-gerar-competicao-liga-cartola',
  templateUrl: './gerar-competicao-liga-cartola.component.html',
  styleUrls: ['./gerar-competicao-liga-cartola.component.scss']
})
export class GerarCompeticaoLigaCartolaComponent implements OnInit {
 
  competicao: any;
  nome_liga = '';
  path_image = '';
  public settings:Settings;

  constructor( private route: ActivatedRoute, public dialog: MatDialog, public appSettings: AppSettings) { 
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.competicao = params;
      this.nome_liga = this.competicao.nome_liga
      this.path_image = this.competicao.path_image
    });
  }


     
   
  public openCouponDialog(data:any){
    const dialogRef = this.dialog.open(AddCompeticaoDialogComponent, {
      data: {
        coupon: data,
        
      },
      panelClass: ['theme-dialog'],
      autoFocus: false,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(coupon => { 
      if(coupon){    
        
      }
    });
  }
  

  

}
