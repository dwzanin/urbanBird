import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

import { CarrinhoService } from '../carrinho.service';

import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})

export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()
  
  constructor(private ofertasService: OfertasService,
              public carrinhoService: CarrinhoService) { }

  ngOnInit() {

    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .distinctUntilChanged()
      .debounceTime(750) //executa a ação apos 1 segundo
      .switchMap((termo: string) => {

        if (termo.trim() === ''){
          // retorna um observable de array de ofertas vazio
          return Observable.of<Oferta[]>([])
        }

        return this.ofertasService.pesquisaOfertas(termo)

      })
      .catch((erro: any) => {
        return Observable.of<Oferta[]>([])
      })

  }

  public pesquisa (termoDaBusca: string): void{
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(inputPesquisa: HTMLInputElement): void{
    this.subjectPesquisa.next('')
    inputPesquisa.value = ''
  }

}