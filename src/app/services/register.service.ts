import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';
import { UserInterface } from '../interfaces/user.interface';
import { ResApiInterface } from '../interfaces/res-api.interface';

@Injectable()
export class RegisterService {
    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }


    //funcion que va a realizar consumo privado
    private _postRegister(user: UserInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(user); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}registro`, paramsStr, { headers: headers });
    }

    //funcion asyncrona con promise

    postRegister(user: UserInterface): Promise<ResApiInterface> {
        //consumo primer servicio
        return new Promise((resolve, reject) => {
            this._postRegister(user).subscribe(
                res => {
                    let resApi: ResApiInterface = {
                        success: true,
                        message: res
                    }

                    resolve(resApi);
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