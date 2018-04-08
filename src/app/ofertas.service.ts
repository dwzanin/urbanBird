import { Http, Response } from '@angular/http'
import { Oferta } from "./shared/oferta.model"
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';

import { URL_API } from './app.api'

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'


@Injectable()
export class OfertasService {

    constructor(private http: Http){}

    public getOfertas(): Promise<Oferta[]>{
        //efetuar uma requisicao http
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
                    .toPromise()  //retornar um promise Oferta []
                    .then((resposta: Response) => resposta.json())   
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then( ( resposta: Response ) => resposta.json())
    }

    public getOfertasPorId(id: number): Promise<Oferta>{
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta: Response) => resposta.json().shift())
    }

    public getComoUsarOfertaPorId (id: number): Promise<string>{
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json().shift())
    }

    public getOndeFicaaPorId (id: number): Promise<string>{
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json().shift())
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?titulo_like=${termo}`)
            .retry(10)
            .map((resposta: Response) => resposta.json())
    }

}