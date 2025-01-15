import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;
  constructor(
    private heroesSevice: HeroesService,        //Inyecto el servicio
    private activatedRoute: ActivatedRoute,      //Necesito el url en en ngOnInit y para eso uso este servicio del route
    private route: Router
  ){}


  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      delay(3000),
      switchMap( ({id}) => this.heroesSevice.getHeroById(id)),

    ).subscribe( hero => {
        if( !hero ) return this.route.navigate(['/heroes/list'])

        this.hero = hero;
        console.log({hero})
        return
    })
  }

  goBack(): void {
    this.route.navigateByUrl('heroes/list')
  }
}
