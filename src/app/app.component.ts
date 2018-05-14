import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'General Delivery';

  constructor (public af: AngularFireAuth, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.af.auth.signOut();
    this.router.navigate(['']);
  }
}
