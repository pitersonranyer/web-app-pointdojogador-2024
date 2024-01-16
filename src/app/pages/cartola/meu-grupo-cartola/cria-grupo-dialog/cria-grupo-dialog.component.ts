import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cria-grupo-dialog',
  templateUrl: './cria-grupo-dialog.component.html',
  styleUrls: ['./cria-grupo-dialog.component.scss']
})
export class CriaGrpoDialogComponent implements OnInit {
  public form: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<CriaGrpoDialogComponent>, 
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
