import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {


  constructor( private authService: AuthService,
              private router: Router
  ){}

  onLogin(): void{


    this.authService.login('eduardo@dti.uncoma.edu.ar','prueba_clave')
    .subscribe( user => {
      this.router.navigate(['/'])
    });

    console.log('salgo del servicio')

  }

}
