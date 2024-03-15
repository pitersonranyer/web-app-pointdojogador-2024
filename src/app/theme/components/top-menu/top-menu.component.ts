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

  public saldoUsuario = 0
  emailVerified: boolean;

  public settings: Settings;
  constructor(public authService: AuthService, public appSettings: AppSettings, public appService: AppService, public translateService: TranslateService,
    private usuarioService: ApiUsuarioService) {
    this.settings = this.appSettings.settings;

    if (this.authService.currentUserValue) {
      this.emailVerified = this.authService.currentUserValue.emailVerified;
    } else {
      this.emailVerified = false
    }

  }

  ngOnInit() {

    if (this.emailVerified) {
      this.recuperarDadosUsuario();
    }

  }

  public recuperarDadosUsuario() {
    this.usuarioService.recuperarUsuario(this.authService.currentUserPointValue.email).subscribe((usuario: any) => {
      this.saldoUsuario = usuario.saldo;
      if (usuario.saldo === null) {
        this.saldoUsuario = 0;
      }
    });
  }

}
