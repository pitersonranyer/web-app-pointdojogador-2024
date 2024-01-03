import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  public followers = [
    { id: 1, image: 'https://s2.glbimg.com/BI35Y2RXukKOPSYaVQrG8vMk4Nk=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_211/escudo/0f/16/33/0089a743fb-2cab-42af-a977-2ab8a8f6e50f20230316191633', name: 'app pointdojogador', storeId: 1 },
    { id: 2, image: 'https://s2.glbimg.com/BAluXaCn_JlIr4PGyZy8Vcw64so=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_201/escudo/dc/45/35/0059b01ddb-44f5-4fa0-bd86-a7f697ee7adc20220326064535', name: 'VMASSISTENCIAT', storeId: 2 },
    { id: 3, image: 'https://s2.glbimg.com/A-B9U0Wd43WKPcY8gOS16En95JU=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_201/escudo/b3/52/11/00181217f0-68ea-4f81-adce-81b353a124b320220331065211', name: 'Brancocarlos', storeId: 1 },
    { id: 4, image: 'https://s2.glbimg.com/QxsYHz_XJl8xgPx4HdD2V98fFis=/https://s3.glbimg.com/v1/AUTH_58d78b787ec34892b5aaa0c7a146155f/cartola_svg_210/escudo/bd/24/21/00f0e2c06b-bc8d-44c1-b181-ed7d830de8bd20220920182421', name: 'MALUQUINHO WSA 20', storeId: 2 },
    { id: 5, image: 'assets/images/profile/bruno.jpg', name: 'Bruno Vespa', storeId: 2 },
    { id: 6, image: 'assets/images/profile/ashley.jpg', name: 'Ashley Ahlberg', storeId: 1 },
    { id: 7, image: 'assets/images/avatars/avatar-5.png', name: 'Michelle Ormond', storeId: 1 }
  ];
  public stores = [
    { id: 1, name: 'Store 1' },
    { id: 2, name: 'Store 2' }
  ];
  public page: any;
  public count = 6;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  public remove(follower:any){  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this follower?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
        const index: number = this.followers.indexOf(follower);
        if (index !== -1) {
          this.followers.splice(index, 1);  
        } 
      } 
    }); 
  }

}
