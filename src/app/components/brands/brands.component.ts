import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Subscription } from 'rxjs/Subscription';

// Service
import { UsersService } from "../../services/users.service";
import { ToastrService } from "ngx-toastr";

// Product Class
import { Users } from "../../models/users";
import { User } from 'firebase/app';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  user: Users[];
  isOn: false;
  subscription: any;

  constructor(
    public userService: UsersService,
    public toastr: ToastrService,
    public af: AngularFireAuth,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.userService.getUsers()
    .snapshotChanges()
    .subscribe(item => {
      this.user = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.user.push(x as Users);
      });
    });
  }

  logout() {
    this.af.auth.signOut();
    this.router.navigate(['']);
  }

}
