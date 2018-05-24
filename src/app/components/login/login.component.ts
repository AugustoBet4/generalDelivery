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
  users: AngularFireList<any>;

  error: any;
  constructor (public af: AngularFireAuth,
    private router: Router,
    public toastr: ToastrService,
    private firebase: AngularFireDatabase) {
  }

  loginFB() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      (success) => {
        // Creacion del usuario en firebase en users para el manejo de roles
        const ref = this.firebase.object('users/' + this.af.auth.currentUser.uid);
        ref.update({
            roles: 'customer',
            mail: this.af.auth.currentUser.email
          });
        this.router.navigate(['/brands']);
        this.toastr.success('Ingreso Exitoso');
      }).catch(
        (error) => {
          console.log(error);
          this.toastr.error('Ingreso Fallido');
          this.error = error;
        })
  }
  
  loginGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (success) => {
        // Creacion del usuario en firebase en users para el manejo de roles
        const ref = this.firebase.object('users/' + this.af.auth.currentUser.uid);
        ref.update({
            roles: 'customer',
            mail: this.af.auth.currentUser.email
          });
        this.router.navigate(['/brands']);
        this.toastr.success('Ingreso Exitoso');
      }).catch(
        (error) => {
          this.toastr.error('Ingreso Fallido');
          this.error = error;
        })
  }
  
  ngOnInit() {
  }

}
