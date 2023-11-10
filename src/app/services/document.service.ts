import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';
import { ResApiInterface } from '../interfaces/res-api.interface';
import { DocumentPostInterface } from '../interfaces/document.interface';

@Injectable()
export class DocumentService {
    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }

    //funcion que va a realizar el consumo en privado.
    private _getDocuments() {
        //consumo de api
        return this._http.get(`${this._urlBase}documentos`);
    }

    // funcion asyncrona con promise
    getDocuments(): Promise<ResApiInterface> {
        //consumo del primer servicio
        return new Promise((resolve, reject) => {
            this._getDocuments().subscribe(
                res => {
                    let resApi: ResApiInterface = {
                        success: true,
                        message: res
                    }
                    resolve(resApi)
                },
                // si algo sale mal
                err => {
                    let resApi: ResApiInterface = {
                        success: false,
                        message: err
                    }
                    resolve(resApi)
                },
            );
        });
    }


     //funcion que va a realizar el consumo en privado.
     private _getDocumentsByUser(user:string) {
        //consumo de api
        return this._http.get(`${this._urlBase}documentos/${user}`);
    }

    // funcion asyncrona con promise
    getDocumentsByUser(user:string): Promise<ResApiInterface> {
        //consumo del primer servicio
        return new Promise((resolve, reject) => {
            this._getDocumentsByUser(user).subscribe(
                res => {
                    let resApi: ResApiInterface = {
                        success: true,
                        message: res
                    }
                    resolve(resApi)
                },
                // si algo sale mal
                err => {
                    let resApi: ResApiInterface = {
                        success: false,
                        message: err
                    }
                    resolve(resApi)
                },
            );
        });
    }


    //funcion que va a realizar consumo privado
    private _postDocument(product: DocumentPostInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(product); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}documentos`, paramsStr, { headers: headers });
    }

    //funcion asyncrona con promise

    postDocument(user: DocumentPostInterface): Promise<ResApiInterface> {
        //consumo primer servicio
        return new Promise((resolve, reject) => {
            this._postDocument(user).subscribe(
                res => {
                    let resApi: ResApiInterface = {
                        success: true,
                        message: res
                    }
                    resolve(resApi)
                },
                //si algo sale mal
                err => {
                    let resApi: ResApiInterface = {
                        success: false,
                        message: err
                    }
                    resolve(resApi);

                }
            );

        });
    }

}