import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-add-competicao-dialog',
  templateUrl: './add-competicao-dialog.component.html',
  styleUrls: ['./add-competicao-dialog.component.scss']
})
export class AddCompeticaoDialogComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // public tiposLigas = ["Rodada", "Mensal", "1º Turno", "2º Turno", "Anual"];

  public tiposLigas = [
    {
      "desc": "Rodada"
    },
    {
      "desc": "Mensal"
    },
    {
      "desc": "1º Turno"
    },
    {
      "desc": "2º Turno"
    },
    {
      "desc": "Anual"
    }
  ]

  public situacaoLigas = [
    {
      "desc": "Aberta"
    },
    {
      "desc": "Fechada"
    },
    {
      "desc": "Encerrada"
    }
  ]

  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<AddCompeticaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tipo_liga: ['', Validators.required],
      status_liga: ['', Validators.required],
      tx_descricao_liga: ['', Validators.required],
      rodada_ini: ['', Validators.required],
      rodada_fim: ['', Validators.required],
      data_fim_inscricao: ['', Validators.required],
      hora_fim_inscricao: ['', Validators.required],
      valor_competicao: ['', Validators.required],
      valor_tx_adm: ['', Validators.required],
      link_grupo_wapp: ['', Validators.required]
    });


    if (this.data.data_parm_competicao) {
      this.form.patchValue(this.data.data_parm_competicao);
    };

    /* competicao_liga_id: 0,
    liga_id: 0, */
  }

  public onSubmit() {

    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }


}
