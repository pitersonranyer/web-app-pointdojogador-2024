import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../app.service';
import { Settings, AppSettings } from '../../../app.settings';
import { AuthService } from 'src/app/service/auth.service';
import { ApiUsuarioService } from 'src/app/service/api.usuario';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency:any; 
  public saldoUsuario = 0

  public settings: Settings;
  constructor(public authService: AuthService, public appSettings:AppSettings, public appService:AppService, public translateService: TranslateService,
    private usuarioService: ApiUsuarioService) { 
    this.settings = this.appSettings.settings; 
  } 

  ngOnInit() {
    this.currency = this.currencies[0];  

    this.usuarioService.recuperarUsuario(this.authService.currentUserPointValue.email).subscribe((usuario: any) => { 
      
      this.saldoUsuario = usuario.saldo;

      if (usuario.saldo === null) {
        this.saldoUsuario = 0;
      }

    
      
     
    });


  }

  public changeCurrency(currency){
    this.currency = currency;
  } 

  public changeLang(lang:string){ 
    this.translateService.use(lang);   
  } 

  public getLangText(lang){
    if(lang == 'de'){
      return 'German';
    }
    else if(lang == 'fr'){
      return 'French';
    }
    else if(lang == 'ru'){
      return 'Russian';
    }
    else if(lang == 'tr'){
      return 'Turkish';
    }
    else{
      return 'English';
    }
  } 

}
