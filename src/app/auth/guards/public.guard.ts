import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, CanMatch, CanActivate, ActivatedRouteSnapshot, UrlSegment, RouterStateSnapshot, Route } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})

export class publicGuard implements CanMatch, CanActivate{

  constructor(  private authService: AuthService,
    private router: Router ) { }




    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {

      return this.checkAuthStatus();
      //return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

      return this.checkAuthStatus();
      //return false;
    }

    checkAuthStatus(): boolean | Observable<boolean> {

      return this.authService.checkAuthentication()
      .pipe(
        tap ( isAuthenticated => {
          if ( isAuthenticated ){
            this.router.navigate(['./heroes']);
          }
        }),
        map( isAuthenticated => !isAuthenticated )

      );
    }



}
