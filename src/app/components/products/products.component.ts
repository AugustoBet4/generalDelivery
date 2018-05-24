import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


import { element } from 'protractor';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  subscription: any;

  constructor(
    public af: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  logout() {
    this.af.auth.signOut();
    this.router.navigate(['']);
  }
}
