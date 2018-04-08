import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service';
import { Pedido } from '../shared/pedido.model';

import { CarrinhoService } from '../carrinho.service'; //export default
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[]

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [ Validators.required,
                                        Validators.minLength(3),
                                        Validators.maxLength(120)]),
    'numero': new FormControl(null, [ Validators.required,
                                      Validators.minLength(1),
                                      Validators.maxLength(20)]),
    'complemento':new FormControl(null),
    'formaPagamento': new FormControl(null, [ Validators.required ])
  })

  constructor(private ordemCompraService: OrdemCompraService, 
              private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens();
  }

  public confirmarCompra(): void {
    let pedido = new Pedido (this.formulario.value.endereco,
                             this.formulario.value.numero,
                             this.formulario.value.complemento,
                             this.formulario.value.formaPagamento,
                             this.carrinhoService.exibirItens())
    this.ordemCompraService.efetivarCompra(pedido)
      .subscribe((id: number) => {this.idPedidoCompra = id
                                  this.carrinhoService.limparCarrinho()})
  }

  public alterarQuantidade(item: ItemCarrinho, acao:number):void {
    this.carrinhoService.alterarQuantidade(item, acao)
  }

}
