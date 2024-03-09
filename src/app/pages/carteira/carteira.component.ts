import { Component, OnInit } from '@angular/core';
import { ApiUsuarioService } from 'src/app/service/api.usuario';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-carteira',
  templateUrl: './carteira.component.html',
  styleUrls: ['./carteira.component.scss']
})
export class CarteiraComponent implements OnInit {

  saldoUsuario = 0;

  constructor(
    public authService: AuthService,
    private usuarioService: ApiUsuarioService
  ) {

  }

  ngOnInit() {

    this.usuarioService.recuperarUsuario(this.authService.currentUserValue.email).subscribe((usuario: any) => {

     // console.log(usuario);
      this.saldoUsuario = usuario.saldo;

    });

  }

  saqueViaWhastApp(){
    window.open("https://chat.whatsapp.com/I9Lgep9V4Pz9PbkwHxW7s7");
  }




}
