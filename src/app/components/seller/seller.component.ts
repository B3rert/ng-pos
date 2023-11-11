import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DocumentInterface, DocumentPostInterface } from 'src/app/interfaces/document.interface';
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
import { UserService } from 'src/app/services/user.service';
import { ShoppInterface } from 'src/app/interfaces/shopp.interface';


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

  transacciones: ShoppInterface[] = [];
  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = []; // Lista filtrada
  isLoading: boolean = false;
  searchText: string = ''; // Texto de búsqueda
  total = 0;


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


  async addProduct(product: ProductInterface) {
    let dialogRef = this._dialog.open(DialogAddComponent, {
      data: product
    });

    let cantidad: number = await dialogRef.afterClosed().toPromise() ?? 0;


    if (cantidad == 0) return;





    let item: ShoppInterface = {
      cantidad: cantidad,
      product: product,
    }

    this.transacciones.push(item);

    this.calcTotal();

    for (let index = 0; index < this.products.length; index++) {
      let item: ProductInterface = this.products[index];

      if (item.codigoProducto == product.codigoProducto) {
        this.products[index].cantidadProducto = item.cantidadProducto - cantidad;
        break;
      }

    }

  }

  async limpiarCarrito() {

    let verificador = await this._widgetService.openDialogActions({
      title: "Vaciar carrito",
      description: "Esta acción no se peude revertir, ¿Estás seguro?",
      verdadero: "Aceptar",
      falso: "Cancelar",
    });

    if (!verificador) return;


    this.transacciones.forEach(transaccion => {
      for (let index = 0; index < this.products.length; index++) {
        let product = this.products[index];

        if (transaccion.product.codigoProducto == product.codigoProducto) {

          this.products[index].cantidadProducto = product.cantidadProducto + transaccion.cantidad;

          break;
        }
      }
    });


    this.transacciones = [];
    this.total = 0;
  }


  calcTotal() {

    this.total = 0;
    this.transacciones.forEach(element => {
      this.total = (element.cantidad * element.product.precioUnitario) + this.total;
    });
  }

  async removeCantidad(index: number) {


    let transaccion: ShoppInterface = this.transacciones[index];

    if (transaccion.cantidad == 1) {


      let verificador = await this._widgetService.openDialogActions({
        title: "Quitar item del carrito",
        description: "Esta acción no se peude revertir, ¿Estás seguro?",
        verdadero: "Aceptar",
        falso: "Cancelar",
      });

      if (!verificador) return;



      for (let j = 0; j < this.products.length; j++) {
        const element = this.products[j];
        if (element.codigoProducto == this.transacciones[j].product.codigoProducto) {
          this.products[j].cantidadProducto++;
          break;
        }
      }

      this.transacciones.splice(index, 1);

      this.calcTotal();

      return;
    }


    this.transacciones[index].cantidad--;

    this.calcTotal();


    for (let j = 0; j < this.products.length; j++) {
      const element = this.products[j];
      if (element.codigoProducto == this.transacciones[j].product.codigoProducto) {
        this.products[j].cantidadProducto++;
        break;
      }
    }


  }

  addCantidad(index: number) {
    //TODO: Hacer validaciones

    this.transacciones[index].cantidad++;
    this.calcTotal();



  }

  async deleteItem(index: number) {


    let verificador = await this._widgetService.openDialogActions({
      title: "Quitar item del carrito",
      description: "Esta acción no se peude revertir, ¿Estás seguro?",
      verdadero: "Aceptar",
      falso: "Cancelar",
    });

    if (!verificador) return;

    this.transacciones.forEach(transaccion => {
      for (let index = 0; index < this.products.length; index++) {
        let product = this.products[index];

        if (transaccion.product.codigoProducto == product.codigoProducto) {

          this.products[index].cantidadProducto = product.cantidadProducto + transaccion.cantidad;

          break;
        }
      }
    });
    this.transacciones.splice(index, 1);
    this.calcTotal();


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


  async confirDoc() {

    let date = new Date();

    let document: DocumentPostInterface = {
      "fecha": date,
      "titulo": "FACT",
      "usuario": UserService.getUser()!
    };

    // TODO: rebajar inventario

    this.isLoading = true;
    let resDoc: ResApiInterface = await this._documentService.postDocument(document);

    if (!resDoc.success) {
      this.isLoading = false;
      console.error(resDoc.message);

      this._widgetService.openSnackbar("Algo salio mal, intentalo más tarde.");

    }

    let newDocument: DocumentInterface = resDoc.message;


    for (const item of this.transacciones) {
      let transaccion: TransactionPostInterface = {
        cantidadVendida: item.cantidad,
        codigoProducto: item.product.codigoProducto,
        documento: newDocument,
        precioUnitario: item.product.precioUnitario,
        usuario: UserService.getUser()!
      }

      let res: ResApiInterface = await this._transactionService.postTransaction(transaccion);

      if (!res.success) {
        this.isLoading = false;
        console.error();
        this._widgetService.openSnackbar("Algo salio mal, intentalo más tarde.");
        return;

      }


    }


    this.isLoading = false;

    this._widgetService.openSnackbar("Venta realizada correctamente");



  }


}


