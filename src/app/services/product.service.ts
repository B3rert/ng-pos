import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';
import { ResApiInterface } from '../interfaces/res-api.interface';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable()
export class ProductService {

    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }

    //funcion que va a realizar el consumo en privado.
    private _getProducts() {
        //consumo de api
        return this._http.get(`${this._urlBase}productos`);
    }

    // funcion asyncrona con promise
    getProducts(): Promise<ResApiInterface> {
        //consumo del primer servicio
        return new Promise((resolve, reject) => {
            this._getProducts().subscribe(
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
    private _postProduct(product: ProductInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(product); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}productos`, paramsStr, { headers: headers });
    }

    //funcion asyncrona con promise

    postProduct(user: ProductInterface): Promise<ResApiInterface> {
        //consumo primer servicio
        return new Promise((resolve, reject) => {
            this._postProduct(user).subscribe(
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


     //funcion que va a realizar consumo privado
     private _putProduct(product: ProductInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(product); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.put(`${this._urlBase}productos`, paramsStr, { headers: headers });
    }

    //funcion asyncrona con promise

    putProduct(user: ProductInterface): Promise<ResApiInterface> {
        //consumo primer servicio
        return new Promise((resolve, reject) => {
            this._putProduct(user).subscribe(
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