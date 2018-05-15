import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import { FirebaseAuth } from '@firebase/auth-types';

import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  email: any;
  password: any;

  state: string = '';
  error: any;
  user: Observable<firebase.User>;

  constructor(public af: AngularFireAuth,
    private router: Router,
    public toastr: ToastrService) { 
    this.af.authState.subscribe( auth => {
      if(auth) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  onSubmit(formData){
    if (formData) {
      this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          this.toastr.success('Ingreso Exitoso');
          this.router.navigate(['/home']);
        }).catch(
          (error) => {
            this.toastr.error('Ingreso Fallido, Datos Incorrectos');
            this.error = error;
          })
    }
  }

  ngOnInit() {
  }

}
