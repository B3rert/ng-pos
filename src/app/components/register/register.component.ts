import { Component } from '@angular/core';
import { RegisterInterface } from 'src/app/interfaces/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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
  //Declaracion de variables privadas
) {
  
}

//guardar Token y navegar a la pantalla Home
ngOnInit(): void {
  // if (StorageService.token) {
  //   this._router.navigate(['/station']);
  // }
}

//Validar usuario y contraseña
async login(): Promise<void> {

  if (!this.nombreInput || !this.claveInput) {
    alert ("Por favor completa todos los campos para continuar")
    // this._widgetsService.openSnackbar("Por favor completa todos los campos para continuar");
    return
  }

  //Interface de credenciales
  let credenciales: RegisterInterface = {
    user: this.nombreInput,
    password: this.claveInput,
    confirmPassword : this.confirmarClaveInput,
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
