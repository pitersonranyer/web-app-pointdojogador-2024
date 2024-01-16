import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-importa-grupo-dialog',
  templateUrl: './importa-grupo-dialog.component.html',
  styleUrls: ['./importa-grupo-dialog.component.scss']
})
export class ImportaGrpoDialogComponent implements OnInit {
  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<ImportaGrpoDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: UntypedFormBuilder) { }

  ngOnInit(): void { 
    this.form = this.fb.group({
      id: 0,
      name: [null, Validators.required],
      hasSubCategory: false,
      parentId: 0
    }); 

    if(this.data.category){
      this.form.patchValue(this.data.category); 
    };
  }

  public onSubmit(){
    console.log(this.form.value);
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

}
