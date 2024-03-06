import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resumo-saldo-dialog',
  templateUrl: './resumo-saldo-dialog.component.html',
  styleUrls: ['./resumo-saldo-dialog.component.scss']
})
export class ResumoSaldoDialogComponent implements OnInit {


  public qtde_time = 0;
  public saldo = 0;
  
  constructor(public dialogRef: MatDialogRef<ResumoSaldoDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: UntypedFormBuilder) { }

  ngOnInit(): void { 
    this.qtde_time = this.data.resumo.qtde_time;
    this.saldo = this.data.resumo.saldoDev;
  }

  public onSubmit(){
    console.log("salvar");
    
  }

}
