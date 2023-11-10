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
  isLoading: boolean = false;
  filteredProducts: ProductInterface[] = []; // Lista filtrada
  searchText: string = ''; // Texto de búsqueda

  constructor(private _productService: ProductService,
    private _documentService: DocumentService,
    private _transactionService: TransactionService,
    private _widgetService: WidgetsService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
 

  create(){
    this._router.navigate(["add"]);
  }


  filterProducts() {
    if (this.searchText.trim() === '') {
      // Si la búsqueda está vacía, muestra todos los productos
      this.filteredProducts = this.products;
    } else {
      // Filtra los productos según el texto de búsqueda
      this.filteredProducts = this.products.filter(product =>
        product.nombreProducto.toLowerCase().includes(this.searchText.toLowerCase()) ||
        product.codigoProducto.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  async getProducts() {

    this.isLoading = true;
    let res: ResApiInterface = await this._productService.getProducts();
    this.isLoading = false;

    if (!res.success) {
      console.error(res.message);

      this._widgetService.openSnackbar("Algo salio mal, intentalo más tarde.");
    }

    this.products = res.message;
    this.filteredProducts = this.products;


    this.products.forEach(element => {
      this.granTotal = (element.cantidadProducto * element.precioUnitario) + this.granTotal;
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
  async deleteProduct(index: number) {

    //dialog confurmar cierre de sesion
    let verificador = await this._widgetService.openDialogActions({
      title: "Eliminar producto",
      description: "Esta acción no se peude revertir, ¿Estás seguro?",
      verdadero: "Aceptar",
      falso: "Cancelar",
    });

    if (!verificador) return;


    this.isLoading = true;

    let res: ResApiInterface = await this._productService.deleteProduct(this.products[index].codigoProducto);

    this.isLoading = false;

    if (!res.success) {
      console.error(res.message);

      this._widgetService.openSnackbar("Algo salio mal, intentalo más tarde.");
    }


    this.products.splice(index, 1);


    this._widgetService.openSnackbar("Producto eliminado correctamente.");

  }


  //Cerra sesion
  async logOut() {

    //dialog confurmar cierre de sesion
    let verificador = await this._widgetService.openDialogActions({
      title: "Cerrar sesión",
      description: "Se perderán los datos que no han sido guardados ¿Estás seguro?",
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
