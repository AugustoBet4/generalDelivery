import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Users } from '../models/users';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UsersService {

  user: any;

  constructor(private firebase: AngularFireDatabase,
    private af: AngularFireAuth) { }

  getUsers(){
    return this.user = this.firebase.list('users/' + this.af.auth.currentUser.uid);
  }
}
