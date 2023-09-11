import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.USER$.subscribe(user => {

      if (!user) return;


      userService.save(user);

      let returnURL = localStorage.getItem('returnURL');
      if (!returnURL) return;

      localStorage.removeItem('returnURL');
      router.navigateByUrl(returnURL);
    })
  }
  ngOnDestroy() {//optional. remove if causing error.
    
  }
}
