import { Component } from '@angular/core';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[RegisterService]
})
export class RegisterComponent {
//Declaracion de variables a utilizar
nombreInput: string = "";
claveInput: string = "";
confirmarClaveInput: string = "";
saveMyData: boolean = false;
mostrarTexto: boolean = false;
isLoading: boolean = false;


//Intancia de servicios
constructor(
  private _registerService: RegisterService,
) {
  this.postLogin()
}

async postLogin(){

  let user:UserInterface = {
    usuario:"Niky",
    clave:"123",
  }

  let res : ResApiInterface = await this._registerService.postRegister(user);


  if(!res.succes){
    console.error(res.response);
    
    alert("Algo salio mal");
    return;
  }


    console.log(res.response);
    

}


//Validar usuario y contraseña
async login(): Promise<void> {

  if (!this.nombreInput || !this.claveInput) {
    alert ("Por favor completa todos los campos para continuar")
    // this._widgetsService.openSnackbar("Por favor completa todos los campos para continuar");
    return
  }


  //TODO: login

 
  if (this.saveMyData) {
    //TODO:sesion permanente
    //guardar el usuario
    // StorageService.user = 'desa023';
  }
  else {
    //TODO:sesion no permanente
    
    // sessionStorage.setItem('user', 'desa023');
  }

  //TODO:Si el usuario esta correcto
  // this._router.navigate(['/home']);
}


}
