import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiCartolaService } from 'src/app/service/api.cartola';

@Component({
  selector: 'app-cria-grupo-dialog',
  templateUrl: './cria-grupo-dialog.component.html',
  styleUrls: ['./cria-grupo-dialog.component.scss']
})
export class CriaGrpoDialogComponent implements OnInit {
  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<CriaGrpoDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: UntypedFormBuilder,
              private apiCartolaService: ApiCartolaService) { }

  ngOnInit(): void { 
    this.form = this.fb.group({
      id: this.data.usuario_id,
      name: [null, Validators.required],
      hasSubCategory: false,
      parentId: 0
    }); 

  }

  public onSubmit(){

    let grupo = {
      grupo_id: 0,
      nome_grupo: this.form.value.name,
      usuario_id: this.form.value.id
    }

    if(this.form.valid){
      this.apiCartolaService.cadastrarGrupoUsuario(grupo)
      .subscribe(() => {
        this.dialogRef.close(this.form.value);
      });
    }
  }

}
