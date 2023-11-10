import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { RegisterService } from 'src/app/services/register.service';
import { Location } from '@angular/common'
import { WidgetsService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    RegisterService,
  WidgetsService,
  ]
})
export class RegisterComponent {
  //Declaracion de variables a utilizar
  nombreInput: string = "";
  claveInput: string = "";
  confirmarClaveInput: string = "";
  mostrarTexto: boolean = false;
  isLoading: boolean = false;


  //Intancia de servicios
  constructor(
    private _registerService: RegisterService,
    private _location: Location,
    private _router:Router,
    private _widgetService:WidgetsService,
  ) {
  }

  backPage() {
    this._location.back();
  }

  //Validar usuario y contraseña
  async register(): Promise<void> {

    if (!this.nombreInput || !this.claveInput || !this.confirmarClaveInput) {
      this._widgetService.openSnackbar("Por favor completa todos los campos para continuar.");
      return;
    }

    if(this.claveInput != this.confirmarClaveInput){
      this._widgetService.openSnackbar("Las contraseñas no coinciden.");
      return;
    }


    let user: UserInterface = {
      usuario: this.nombreInput,
      clave: this.claveInput,
    }

    this.isLoading = true;
    let res: ResApiInterface = await this._registerService.postRegister(user);
    this.isLoading = false;

    if (!res.success) {
      console.error(res.message);
      this._widgetService.openSnackbar("Algo salió mal, intentalo más tarde");
      return;
    }

    let response:ResApiInterface = res.message;

    
    if(!response.success){
      this._widgetService.openSnackbar(response.message);
      return;
    }



    this._router.navigate(['/home']);
  }


}
