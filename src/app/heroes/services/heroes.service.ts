import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { enviroments } from 'src/enviroments/enviroments';


@Injectable({providedIn: 'root'})
export class HeroesService {

 private baseUrl: string = enviroments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]> {

    return this.http.get<Hero[]>(`${ this.baseUrl}/heroes`);
  }

  getHeroById( id: string ): Observable<Hero | undefined>{

    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      catchError( error => of(undefined))  //of forma de crear observables basados en el valor que especifico
    )

  }

  getSuggestion( query: string ){

    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

  addHero( hero: Hero ): Observable<Hero> {

    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);

  }

  updateHero( hero: Hero ): Observable<Hero> {

    if ( !hero.id ) throw Error ('Hero Id es requerido');

    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero);

  }

  deleteHeroById( id: string ): Observable<boolean> {

    return this.http.delete<boolean>(`${ this.baseUrl }/heroes/${ id }`)
    .pipe(
      map( resp => true ),
      catchError( err => of(false) ),

    );

  }


}
