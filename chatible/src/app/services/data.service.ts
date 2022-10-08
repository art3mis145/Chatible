import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  users!: Observable<User[]>;
  user: User;
  items: User[] = [];

  constructor(public db: AngularFirestore) {
    this.users = db.collection<User>('users').valueChanges({ idField: 'uid' });
    this.users.subscribe((data) => {
      this.items = data;
    });
  }

  public getAllUser() {
    return this.users;
  }
  public getUser(uid: any) {
    console.log(uid);
    // this.db
    //   .collection<User>('users', (ref) => ref.where('uid', '==', uid))
    //   .get()
    //   .toPromise()
    //   .then((query) => {
    //     query.forEach((doc) => {
    //       this.user = doc.data();
    //       console.log(this.user);
    //     });
    //   });
    // return this.user;
    for (let index = 0; index < this.items.length; index++) {
      if (this.items[index].uid == uid) {
        this.user = this.items[index];
      }
    }
  }
}
