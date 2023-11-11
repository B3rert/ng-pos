import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DocumentPostInterface } from 'src/app/interfaces/document.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { TransactionPostInterface } from 'src/app/interfaces/transaction.interface';
import { DocumentService } from 'src/app/services/document.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Location } from '@angular/common'
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { WidgetsService } from 'src/app/services/widget.service';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';


@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
  providers: [
    DocumentService,
    TransactionService,
    WidgetsService,
    ProductService,
  ]
})
export class SellerComponent {

  transacciones: TransactionPostInterface[] = [];
  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = []; // Lista filtrada
  isLoading: boolean = false;
  searchText: string = ''; // Texto de búsqueda


  constructor(
    private _documentService: DocumentService,
    private _transactionService: TransactionService,
    private _location: Location,
    private _productService: ProductService,
    private _widgetService: WidgetsService,
    private _dialog: MatDialog,
  ) {

    this.getProducts();
  }


    addProduct(product:ProductInterface){
      const dialogRef = this._dialog.open(DialogAddComponent, {
        data: product
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            //hay respuest
        } else {
          //no hay respúesta
        }
    });
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


    

  }


  backPage() {
    this._location.back();
  }

  //Abrir/Cerrar SideNav
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  @ViewChild('sidenavend')
  sidenavend!: MatSidenav;

  //Abrir cerrar Sidenav
  close(reason: string) {
    this.sidenav.close();
    this.sidenavend.close();
  }
  async postDocument() {


    let date = new Date();

    let document: DocumentPostInterface = {
      "fecha": date,
      "titulo": "Nuevo Documento",
      "usuario": "ejemploUsuario"
    };


    let res: ResApiInterface = await this._documentService.postDocument(document);


    if (!res.success) {
      console.error(res.message);

      alert("Algo salio mal");
    }

    console.log(res.message);


  }

  async postTransaction() {


    let date = new Date();

    let transaction: TransactionPostInterface =
    {
      "documento": {
        "id": 3,
        "fecha": date,
        "titulo": "Factura",
        "usuario": "admin"
      },
      "codigoProducto": "001",
      "cantidadVendida": 1,
      "precioUnitario": 4.5,
      "usuario": "admin"
      ,
    };


    let res: ResApiInterface = await this._transactionService.postTransaction(transaction);


    if (!res.success) {
      console.error(res.message);

      alert("Algo salio mal");
    }

    console.log(res.message);


  }

}


