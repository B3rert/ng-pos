import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';
import { ResApiInterface } from '../interfaces/res-api.interface';
import { DocumentPostInterface } from '../interfaces/document.interface';
import { TransactionPostInterface } from '../interfaces/transaction.interface';

@Injectable()
export class TransactionService {
    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }

    //funcion que va a realizar el consumo en privado.
    private _getTransactionsByDoc(doc:number) {
        //consumo de api
        return this._http.get(`${this._urlBase}transacciones/documento/${doc}`);
    }

    // funcion asyncrona con promise
    getTransactionsByDoc(doc:number): Promise<ResApiInterface> {
        //consumo del primer servicio
        return new Promise((resolve, reject) => {
            this._getTransactionsByDoc(doc).subscribe(
                res => {
                    let resApi: ResApiInterface = {
                        succes: true,
                        response: res
                    }
                    resolve(resApi)
                },
                // si algo sale mal
                err => {
                    let resApi: ResApiInterface = {
                        succes: false,
                        response: err
                    }
                    resolve(resApi)
                },
            );
        });
    }


    //funcion que va a realizar consumo privado
    private _postTransaction(transaction: TransactionPostInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(transaction); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}transacciones`, paramsStr, { headers: headers });
    }

    //funcion asyncrona con promise

    postTransaction(transaction: TransactionPostInterface): Promise<ResApiInterface> {
        //consumo primer servicio
        return new Promise((resolve, reject) => {
            this._postTransaction(transaction).subscribe(
                res => {
                    let resApi: ResApiInterface = {
                        succes: true,
                        response: res
                    }
                    resolve(resApi)
                },
                //si algo sale mal
                err => {
                    let resApi: ResApiInterface = {
                        succes: false,
                        response: err
                    }
                    resolve(resApi);

                }
            );

        });
    }

}