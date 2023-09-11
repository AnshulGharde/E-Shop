import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/auth';
import { ActivatedRoute } from '@angular/router';
import { switchMap, Observable} from 'rxjs';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  USER$: Observable<firebase.User | null | undefined>;
 
  constructor(
    private userService: UserService, 
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    this.USER$ = <Observable<firebase.User | null | undefined>>afAuth.authState;    
  }

  login(){
    let returnURL = this.route.snapshot.queryParamMap.get('returnURL')! ||'/';
    localStorage.setItem('returnURL', returnURL);
    
    this.afAuth.signInWithRedirect(new firebase.GoogleAuthProvider());
  }

  logout(){
    
    this.afAuth.signOut();
    //localStorage.removeItem('cartId');
  }

  get appUser$() : Observable<AppUser|null>{
    return this.USER$.pipe(switchMap(user => {
      if(user) return this.userService.get(user!.uid).valueChanges();

      return of(null);
    }))
  }
}
