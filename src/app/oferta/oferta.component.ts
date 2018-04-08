import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

import { CarrinhoService } from '../carrinho.service'; //export default
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertasPorId(parametros.id)
        .then((oferta: Oferta) => this.oferta = oferta)
    })
    
    /* --- OBSERVABLE
    this.route.params.subscribe((parametro: any) => console.log("teste", parametro), // returono com sucesso
                                ((erro: any) => console.log(erro)), // retorno erro
                                () => console.log("processamento concluido") // fim processamento
                               )

    let tempo = Observable.interval(500)                           

    tempo.subscribe((intervalo: number) => {
      console.log(intervalo)
    })*/

  }

  ngOnDestroy(){
  }

  public AdicinarItemCarrinho():void{
    this.carrinhoService.incluirItem(this.oferta)
  }

}
