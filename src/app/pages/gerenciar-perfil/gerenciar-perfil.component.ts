
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User_Point } from 'src/app/models/user_point';
import { ApiUsuarioService } from 'src/app/service/api.usuario';



@Component({
  selector: 'app-gerenciar-perfil',
  templateUrl: './gerenciar-perfil.component.html',
  styleUrls: ['./gerenciar-perfil.component.scss']
})
export class GerenciarPerfilComponent implements OnInit {

  usuario: User_Point;

  id = 0;
  nome = '';
  uid = '';
  saldo = 0

  valorDB = 0;
  email = '';
  valorPix = '';
  form: FormGroup;

  constructor(
    private usuarioService: ApiUsuarioService,
    fb: FormBuilder,
  ) {
    this.form = fb.group({
      email: [''],
      valorPixCurrency: [''],
    })
  }

  ngOnInit() {


  }

  buscarUsuario() {

    this.usuarioService.recuperarUsuario(this.email).subscribe((usuario: any) => {

      this.usuario = usuario;

      this.id = this.usuario.id;
      this.nome = this.usuario.nome;
      this.uid = this.usuario.uid;
      this.saldo = this.usuario.saldo;
 

    });
  }


  atualizarSaldo() {

    this.valorDB = parseInt(this.valorPix);
    this.usuario.saldo = this.valorDB;
    this.usuarioService.atualizarSaldoUsuario(this.usuario).subscribe((usuario: any) => {

      this.saldo = usuario.saldo;
      alert('Alteração efetuada com sucesso!');
    });
  }


}
