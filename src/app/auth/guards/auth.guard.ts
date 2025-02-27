import { Injectable } from '@angular/core';
import { CanMatch, CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {


  constructor( private authService: AuthService,
              private router: Router
   ){}

  checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
    .pipe(
      tap ( isAuthenticated => {
        if ( !isAuthenticated ){
          this.router.navigate(['./auth/login']);
        }
      })

    );
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {

    //console.log('Can Match');
    //console.log({ route, segments });

    return this.checkAuthStatus();
    //return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {


    //console.log('Can Activated');
    //console.log({ route, state});

    return this.checkAuthStatus();
    //return false;
  }

}
