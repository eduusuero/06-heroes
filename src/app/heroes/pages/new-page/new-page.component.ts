import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', {nonNullable: true}),
    publisher:        new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics'},
    { id: 'Marvel Comics' , desc: 'Marvel - Comics'}
  ]



  constructor (
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ){}


  ngOnInit(): void {

    if ( !this.router.url.includes('edit')) return; //SI NO INCLUYE EDIT ES QUE ESTA CARGANDO UNO NUEVO

    else{  //SI INCLUYE EDIT ENTONCES HAY QUE CARGAR LOS DATOS EN EL FORMULARIO DESDE EL BACKEND

      this.activatedRoute.params
      .pipe	(
        switchMap( ({ id }) => this.heroesService.getHeroById( id )),
      ).subscribe ( hero => {

        if ( !hero )
        {
          return this.router.navigateByUrl('/'); //SI NO EXISTE EL HERO LO SACO DE LA RUTA
        }
        this.heroForm.reset(hero);

        return



      })
    }

  }

  get currentHero(): Hero {

    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(){

    if ( this.heroForm.invalid ) return

    if ( this.currentHero.id )// SI TENGO ID TENGO QUE CREAR SINO ACTUALIZAR
    {
      this.heroesService.updateHero( this.currentHero)
      .subscribe( hero => {
        this.mostrarSnackBar(`${ hero.superhero } updated!` );//TODO: mostrar snackbar
      });

      return;
    }

    this.heroesService.addHero( this.currentHero )
    .subscribe ( hero => {
      this.mostrarSnackBar(`${ hero.superhero } created!` ); //TODO: mostrar snackbar y navegar a /heroes/edit/ hero.id

        this.router.navigate(['/heroes/edit', hero.id] );
    })

  }

  onDeleteHero(){
    if ( !this.currentHero.id ){
      throw Error('Hero id is required');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    //PUEDO USAR ESTE O EL DE ABAJO QUE ESTA COMENTADO
    dialogRef.afterClosed()
    .pipe(
      filter(( result: boolean ) => result ),
      switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id )),
      filter( (fueBorrado: boolean ) => fueBorrado ),
    )
    .subscribe( () => {
      this.router.navigate(['/heroes']);

    })


    //dialogRef.afterClosed().subscribe(result => {
    //
    //  if ( !result ) return;
    //
    //  this.heroesService.deleteHeroById( this.currentHero.id )
    //  .subscribe( resultToF => {
    //    if ( resultToF ){
    //      this.router.navigate(['/heroes']);
    //    }
    //  });
    //});
  }

  mostrarSnackBar( mensaje: string ):void {
    this.snackBar.open( mensaje, '',{ duration: 2500});
  }


}
