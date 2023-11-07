import { Component } from '@angular/core';
import { LoginInterface } from 'src/app/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  //Declaracion de variables a utilizar
  nombreInput: string = "";
  claveInput: string = "";
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
    let credenciales: LoginInterface = {
      user: this.nombreInput,
      password: this.claveInput,
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

  //Permanencia de la sesión
  rememberMe(): void {
    this.saveMyData ? this.saveMyData = false : this.saveMyData = true;
  }
}
