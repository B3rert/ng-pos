import { Component } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { DataService } from 'src/app/services/data.service';
import { ProductService } from 'src/app/services/product.service';
import { WidgetsService } from 'src/app/services/widget.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ProductService, WidgetsService]
})
export class EditProductComponent {

  product: ProductInterface;
  isLoading: boolean = false;


  constructor(
    private _productService: ProductService,
    private _dataService: DataService,
    private _location: Location,
    private _widgetService: WidgetsService,
  ) {
    this.product = this._dataService.getSharedData();

  }

  backPage() {
    this._location.back();
  }


  async putPorouct() {


    if (!this.product.codigoProducto) {
      this._widgetService.openSnackbar("Por favor completa todos los campos del formualrio");
      return;
    }

    if (!this.product.nombreProducto) {
      this._widgetService.openSnackbar("Por favor completa todos los campos del formualrio");
      return;
    }

    if (!this.product.precioUnitario) {
      this._widgetService.openSnackbar("Por favor completa todos los campos del formualrio");
      return;
    }

    if (!this.product.cantidadProducto) {
      this._widgetService.openSnackbar("Por favor completa todos los campos del formualrio");
      return;
    }

    if (isNaN(Number(this.product.precioUnitario))) {
      this._widgetService.openSnackbar("Precio unitario debe ser un dato numerico");
      return;
    }

    if (isNaN(Number(this.product.cantidadProducto))) {
      this._widgetService.openSnackbar("La cantidad debe ser un dato numerico.");
      return;
    }

    let price: number = + this.product.precioUnitario;
    let cantidad: number = + this.product.cantidadProducto;


    if (price < 0) {
      this._widgetService.openSnackbar("El precio no puede ser menor a 0");
      return;
    }

    if (cantidad < 0) {
      this._widgetService.openSnackbar("La cantidad no puede ser menor a 0");
      return;
    }

    this.product.precioUnitario = price;
    this.product.cantidadProducto = cantidad;

    this.isLoading = true;
    let res: ResApiInterface = await this._productService.putProduct(this.product);
    this.isLoading = false
    
    if (!res.success) {
      console.error(res.message);

      this._widgetService.openSnackbar("Algo salió mal, intentalo más tarde");

    }

    let response: ResApiInterface = res.message;

    if (!response.success) {
      this._widgetService.openSnackbar(response.message);

      return;
    }


    this._widgetService.openSnackbar(response.message);
  }
}
