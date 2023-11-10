import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentInterface } from 'src/app/interfaces/document.interface';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { DocumentService } from 'src/app/services/document.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { WidgetsService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ProductService,
    DocumentService,
    TransactionService,
    WidgetsService,
  ]
})
export class HomeComponent {


  products: ProductInterface[] = [];
  documents: DocumentInterface[] = [];
  granTotal: number = 0;

  constructor(private _productService: ProductService,
    private _documentService: DocumentService,
    private _transactionService:TransactionService,
    private _widgetService:WidgetsService,
    private _router:Router,
    ) {}

  ngOnInit(): void {
    this.getProducts();
  }



  async getProducts() {

    let res: ResApiInterface = await this._productService.getProducts();


    if (!res.success) {
      console.error(res.message);

      this._widgetService.openSnackbar("Algo salio mal, intentalo más tarde.");
    }

    this.products = res.message;


    this.products.forEach(element => {
      this.granTotal = (element.cantidadProducto *element.precioUnitario) + this.granTotal;
    });

  }

  async getDocuments() {

    let res: ResApiInterface = await this._documentService.getDocuments();


    if (!res.success) {
      console.error(res.message);

      alert("Algo salio mal");
    }

    this.documents = res.message;

    console.log(this.documents);

  }


  async getDocumentsByUser() {

    let res: ResApiInterface = await this._documentService.getDocumentsByUser("b3rert");


    if (!res.success) {
      console.error(res.message);

      alert("Algo salio mal");
    }

    this.documents = res.message;

    console.log(this.documents);

  }


  async getTransactionsByDoc() {

    let res: ResApiInterface = await this._transactionService.getTransactionsByDoc(3);


    if (!res.success) {
      console.error(res.message);

      alert("Algo salio mal");
    }

    this.documents = res.message;

    console.log(this.documents);

  }
  async deleteProduct() {

    let res: ResApiInterface = await this._productService.deleteProduct("1000");


    if (!res.success) {
      console.error(res.message);

      alert("Algo salio mal");
    }


    console.log(res.message);

  }


  //Cerra sesion
  async logOut() {

    //dialog confurmar cierre de sesion
    let verificador = await this._widgetService.openDialogActions({
      title:  "Cerrar sesión" ,
      description:  "Se perderán los datos que no han sido guardados ¿Estás seguro?" ,
      verdadero: "Aceptar",
      falso: "Cancelar",
    });

    if (!verificador) return;
    //Limpiar datos del storage
    localStorage.clear();
    sessionStorage.clear();
    //return to login and delete de navigation route
    this._router.navigate(['/login']);
  }


}
