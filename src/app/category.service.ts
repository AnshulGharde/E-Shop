import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getALL(){

    return this.db
        .list('/categories', (ref) => ref.orderByChild('name'))
        .snapshotChanges()
        .pipe(
        map((actions) => {
            return actions.map((action) => ({
                key: action.key,
                name: action.payload.child('name').val()
            }));
        }));

        
  }
}
