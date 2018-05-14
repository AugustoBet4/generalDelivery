import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { ToastrService } from "ngx-toastr";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  items: AngularFireList<any[]>;
  msgVal: string = '';

  error: any;
  constructor (public af: AngularFireAuth,
    private router: Router,
    public toastr: ToastrService) {

    this.af.authState.subscribe(auth => {
      if(auth){
        this.router.navigateByUrl('/home');
      }
    });

  }

  loginFB() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      (success) => {
        this.router.navigate(['/home']);
        this.toastr.success('Ingreso Exitoso');
      }).catch(
        (err) => {
          this.error = err;
        })
  }
  
  loginGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (success) => {
        this.router.navigate(['/home']);
        this.toastr.success('Ingreso Exitoso');
      }).catch(
        (error) => {
          this.toastr.error('Ingreso Fallido, Datos Incorrectos');
          this.error = error;
        })
  }
  
  ngOnInit() {
  }

}
