import { Component } from '@angular/core';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginService]
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
    private _loginService: LoginService,
  ) {
    this.postLogin();
  }

  async postLogin(){

    let user:UserInterface = {
      usuario:"Niky",
      clave:"123",
    }

    let res : ResApiInterface = await this._loginService.postLogin(user);


    if(!res.succes){
      console.error(res.response);
      
      alert("Algo salio mal");
      return;
    }


      console.log(res.response);
      

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
