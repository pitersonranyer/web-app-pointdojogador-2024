import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiUsuarioService } from 'src/app/service/api.usuario';

@Component({
  selector: 'app-resumo-saldo-dialog',
  templateUrl: './resumo-saldo-dialog.component.html',
  styleUrls: ['./resumo-saldo-dialog.component.scss']
})
export class ResumoSaldoDialogComponent implements OnInit {


  public qtde_time = 0;
  public saldoDev = 0;
  public saldoAtu = 0;
  public saldoInsuficiente = false;

  
  constructor(public dialogRef: MatDialogRef<ResumoSaldoDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: UntypedFormBuilder ,
              private usuarioService: ApiUsuarioService) { }

  ngOnInit(): void { 
    this.qtde_time = this.data.resumo.qtde_time;
    this.saldoDev = this.data.resumo.saldoDev;
    this.saldoAtu = this.data.resumo.saldoAtu;
    if (this.saldoDev < 0){
      this.saldoInsuficiente = false;
    }else{
      this.saldoInsuficiente = true;
    }
  }

  public onSubmit(){

    this.data.resumo.usuario.saldo = this.saldoAtu;
    
    this.usuarioService.debitarSaldoUsuario(this.data.resumo.usuario)
      .subscribe((retDebSaldo) => { 
        if (retDebSaldo){
          this.dialogRef.close(true);
        }
      }); 
   
  }

}
