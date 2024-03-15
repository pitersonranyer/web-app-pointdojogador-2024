import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: UntypedFormGroup;
  registerForm: UntypedFormGroup;

  constructor(public formBuilder: UntypedFormBuilder, public router:Router, public snackBar: MatSnackBar,
    public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

  }

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Email ou senha inválido!', '×', { panelClass: 'warn', verticalPosition: 'top', duration: 3000 });
      return;
    } else {
      this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((emailVerified) => { 
        if (emailVerified === 'false') {
          this.snackBar.open('Email não verificado, clique em Esqueceu a senha?', '×', { panelClass: 'warn', verticalPosition: 'top', duration: 3000 });
          }
      })
    }
  }

  public onRegisterFormSubmit(values:Object):void {
 
    if (this.registerForm.valid) {
 //     this.snackBar.open('Login efetuado com sucesso!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.authService.SignUp(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.name)
    }
  }

}
