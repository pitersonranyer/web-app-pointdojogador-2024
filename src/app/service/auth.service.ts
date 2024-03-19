import { User_Point } from './../models/user_point';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ApiUsuarioService } from './api.usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentUserPoinSubject: BehaviorSubject<User_Point>;
  public currentUserPoint: Observable<User_Point>;
  public usuario: User_Point = <User_Point>{};

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public usuarioService: ApiUsuarioService,
    public snackBar: MatSnackBar,

  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUserPoinSubject = new BehaviorSubject<User_Point>(
      JSON.parse(localStorage.getItem('userPoint'))
    );


    this.currentUser = this.currentUserSubject.asObservable();

    this.currentUserPoint = this.currentUserPoinSubject.asObservable();

  }



  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserPointValue(): User_Point {
    return this.currentUserPoinSubject.value;
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  /* get dadosUsuario(): boolean {

    if (this.isLoggedIn) {
      this.usuarioService.recuperarUsuario(this.usuario.email)
        .subscribe((retorno) => {
          localStorage.setItem('dadosUsuario', JSON.stringify(retorno));
          localStorage.setItem('userPoint', JSON.stringify(userPoint));
        })
    }

    return true

  } */


  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          this.SetUserData(result.user);
          this.usuarioService.recuperarUsuario(result.user.email)
            .subscribe((userPoint) => {
              localStorage.setItem('currentUser', JSON.stringify(result.user));
              localStorage.setItem('userPoint', JSON.stringify(userPoint));
              this.currentUserPoinSubject.next(userPoint);
              this.router.navigate(['']);
            })
          this.currentUserSubject.next(result.user);

        } else {
          return JSON.stringify(result.user.emailVerified);
          // window.alert('E-mail não verificado');
        }


      })
      .catch((error) => {
        // this.toastrService.error(error.message, 'Erro Autententicação!');
        window.alert(error.message);
      });
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userPoint');
    this.currentUserSubject.next(null);
    this.currentUserPoinSubject.next(null);
    this.router.navigate(['']);
    return of({ success: false });
  }

  // Sign up with email/password
  // Piterson
  SignUp(email: string, password: string, displayName: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificationMail() function when new user sign
         up and returns promise */
        this.updateProfile(displayName);
        this.currentUserSubject.next(result.user);
        this.usuario.uid = result.user.uid;
        this.usuario.email = result.user.email;
        this.usuario.nome = displayName;
        this.usuario.saldo = null;
        this.usuarioService.cadastrarUserPoint(this.usuario)
          .subscribe((userPoint: any) => {
            this.SetUserData(result.user);
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            localStorage.setItem('userPoint', JSON.stringify(userPoint));
            this.currentUserPoinSubject.next(userPoint);
            this.SendVerificationMail();
          })
      })
      .catch((error) => {
        //this.toastrService.error('O endereço de e-mail já está sendo usado por outra conta.');
        this.snackBar.open('O endereço de e-mail já está sendo usado por outra conta.', '×', { panelClass: 'warn', verticalPosition: 'top', duration: 3000 });

      });

    /* .catch((error) => {

      const code = error.code;
      const credential = error.credential;

      console.log({ error })
      if (code === 'auth/email-already-in-use') {
        // Get other Auth providers user has used before (e.g google.com)
        this.afAuth.fetchSignInMethodsForEmail(email).then(result => {
          console.log(result)
          const provider = this.getAuthProvider(result);
          // Log in the user with other provider used before
          this.AuthLogin(provider).then(result => {
            this.afAuth.authState.pipe(take(1)).subscribe(user => {
              if (user) {
                user.linkWithCredential(credential).then(() => {
                  console.log('Credential linked successfully: ', credential);
                });
              }
            });
          });
        });
      }
    }); */
  }

  updateProfile(name: string) {
    this.afAuth.currentUser.then((user: firebase.User) => {
      user.updateProfile({ displayName: name });
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    });
  }

  // Send email verification when new user sign up
  SendVerificationMail() {
    this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/verify-email-address']);
      });
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('E-mail de redefinição de senha enviado, verifique sua caixa de entrada.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  getAuthProvider(provider: string) {
    return new this.GoogleAuth();
  }

  // Sign in with Google
  GoogleAuth() {
    this.AuthLogin(new auth.GoogleAuthProvider())
  }



  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.currentUserSubject.next(result.user);
        this.usuario.uid = result.user.uid;
        this.usuario.email = result.user.email;
        this.usuario.nome = result.user.displayName;
        this.usuario.saldo = null;
        this.usuarioService.cadastrarUserPoint(this.usuario)
          .subscribe((userPoint: any) => {
            this.SetUserData(result.user);
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            localStorage.setItem('userPoint', JSON.stringify(userPoint));
            this.currentUserPoinSubject.next(userPoint);
            this.router.navigate(['']);
          })
      })

      .catch((error) => {
        window.alert(error);
      });
  }



  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

}