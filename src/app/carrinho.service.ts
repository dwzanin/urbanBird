import { ItemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

export class CarrinhoService {

    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem (oferta: Oferta): void{
        
        let itemCarrinho = new ItemCarrinho (oferta.id,
                                             oferta.imagens[0],
                                             oferta.titulo,
                                             oferta.descricao_oferta,
                                             oferta.valor,
                                             1)

        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade ++; 
        }
        else  this.itens.push(itemCarrinho)

    }

    public totalCarrinhoCompras(): number{

        let total: number = 0

        this.itens.map((item: ItemCarrinho) => {total += item.valor * item.quantidade })

        return total
    }

    public alterarQuantidade (itemCarrinho: ItemCarrinho, acao: number): void{

        //incrementar quantidade
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)

        if (itemCarrinhoEncontrado){

            switch(acao){

                case 0: { // dicionar
                    itemCarrinhoEncontrado.quantidade++
                    break; 
                 }

                 case 1: { //diminuir 
                    if (itemCarrinhoEncontrado.quantidade > 0 )
                    itemCarrinhoEncontrado.quantidade--
                    break; 
                 } 

                 case 2: { //remover 
                    this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
                    break; 
                 }  
       
            }
        }

    }

    public limparCarrinho(): void{
        this.itens = []
    }

}