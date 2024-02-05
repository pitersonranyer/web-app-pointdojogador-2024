import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-importa-time-favorito-dialog',
  templateUrl: './importa-time-favorito-dialog.component.html',
  styleUrls: ['./importa-time-favorito-dialog.component.scss']
})
export class ImportaTimeFavoritoDialogComponent implements OnInit {
  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<ImportaTimeFavoritoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: this.data.usuario_id,
      name: [null, Validators.required],
      hasSubCategory: false,
      parentId: 0
    });

    if (this.data.category) {
      this.form.patchValue(this.data.category);
    };




  }

  public onSubmit() {
    if (this.form.valid) {

     var stringSlug = this.form.value.name.toString();
     var tamanho = stringSlug.length;
     var posicao = stringSlug.indexOf("=>");
     if (posicao === -1) {
       posicao = -2
     }

     var stringSlugFormatado = stringSlug.substring(posicao + 2, tamanho)
     var arraySlugs = stringSlugFormatado.split(";").map(Number);
 
     if (isNaN(arraySlugs[0])) {
       console.log('Código(s) inválido(s)!');
     } else {
 
      let timeFavorito = {
        usuario_id: this.form.value.id,
        arraySlugs: arraySlugs,
      }
        this.dialogRef.close(timeFavorito);
     }


     
    }
  }

}
