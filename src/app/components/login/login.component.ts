import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';



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
  constructor (public af: AngularFireAuth, private router: Router) {

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
      }).catch(
        (err) => {
          this.error = err;
        })
  }
  loginGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (success) => {
        this.router.navigate(['/home']);
      }).catch(
        (err) => {
          this.error = err;
        })
  }

  ngOnInit() {
  }

}
