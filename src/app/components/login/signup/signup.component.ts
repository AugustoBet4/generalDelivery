import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: any;
  password: any;
  
  users: AngularFireList<any>;
  state: string = '';
  error: any;

  constructor(public af: AngularFireAuth, private router: Router, 
    private firebase: AngularFireDatabase) {

    this.af.authState.subscribe( auth => {
      if(auth) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  onSubmit(formData){
    if (formData) {
      // CREACION DE CUENTA CON EMAIL
      this.af.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          const ref = this.firebase.object('users/' + this.af.auth.currentUser.uid);
          ref.update({
            roles: 'client',
            mail: formData.value.email
          });
          var user = this.af.auth.currentUser;
          user.sendEmailVerification();
          this.router.navigate(['/login'])
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
