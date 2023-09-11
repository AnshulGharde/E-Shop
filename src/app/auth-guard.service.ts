import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(_route:any , state: RouterStateSnapshot){
    return this.auth.USER$.pipe(map(user => {
      if (user) return true;

      this.router.navigate(['/login'],{ queryParams: { returnURL: state.url}});
      return false;
    }))
  }
}
