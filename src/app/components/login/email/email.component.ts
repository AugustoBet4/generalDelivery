import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import { FirebaseAuth } from '@firebase/auth-types';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;
  user: Observable<firebase.User>;

  constructor(public af: AngularFireAuth, private router: Router) { 
    this.af.authState.subscribe( auth => {
      if(auth) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  onSubmit(formData){
    if (formData) {
      console.log(formData.value);
      this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          console.log(success); 
          this.router.navigate(['/login']);
          var user = this.af.auth.currentUser;
          user.sendEmailVerification();
        }).catch(
          (err) => {
            console.log(err);
            this.error = err;
          })
    }
  }

  ngOnInit() {
  }

}
