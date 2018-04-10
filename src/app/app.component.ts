import { Component, OnInit } from '@angular/core';
import { OfertasService } from './ofertas.service';
import { Oferta } from './shared/oferta.model';
import { trigger, state, style, transition, animate } from '@angular/animations'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ OfertasService ],
  animations: [
    trigger('animacao', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0}),
        animate('1.7s 0ms ease-in-out') // duração, delay e a aceleração
      ])
    ])
  ]
})

export class AppComponent implements OnInit  {

  public title: string = 'app'
  public ofertas: Oferta []
  public criado: String = 'criado'

  constructor(private ofertasService: OfertasService) {}

  ngOnInit(){

    this.ofertasService.getOfertas()
      .then(( ofertas: Oferta[] ) => {
        this.ofertas = ofertas 
      })
      .catch(( param: any ) => {
        console.log(param)
      })
  }

}