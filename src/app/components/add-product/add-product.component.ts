import { Component } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common'
import { WidgetsService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [
    ProductService,
  WidgetsService,
  ]
})
export class AddProductComponent {

  codigoProducto: string = "";
  cantidadProducto: string = "";
  nombreProducto: string = "";
  precioUnitario: string = "";

  isLoading: boolean = false;


  constructor(
    private _productService: ProductService,
    private _location: Location,
    private _widgetService: WidgetsService,
  ) {


  }

  backPage() {
    this._location.back();
  }

  async postPorouct() {


    if(!this.codigoProducto){
      this._widgetService.openSnackbar("Por favor completa todos los campos del formualrio");
      return;
    }
    
    if(!this.nombreProducto){
      this._widgetService.openSnackbar("Por favor completa todos los campos del formualrio");
      return;
    }
    
    if(!this.precioUnitario){
      this._widgetService.openSnackbar("Por favor completa todos los campos del formualrio");
      return;
    }
    
    if(!this.cantidadProducto){
      this._widgetService.openSnackbar("Por favor completa todos los campos del formualrio");
      return;
    }
    
    if(isNaN(Number(this.precioUnitario))){
      this._widgetService.openSnackbar("Precio unitario debe ser un dato numerico");
      return;
    }

    if(isNaN(Number(this.cantidadProducto))){
      this._widgetService.openSnackbar("La cantidad debe ser un dato numerico.");
      return;
    }

    let price: number = + this.precioUnitario;
    let cantidad: number = + this.cantidadProducto;


    if(price< 0){
      this._widgetService.openSnackbar("El precio no puede ser menor a 0");
      return;
    }

    if(cantidad< 0){
      this._widgetService.openSnackbar("La cantidad no puede ser menor a 0");
      return;
    }

    let product: ProductInterface = {
      "codigoProducto": this.codigoProducto,
      "nombreProducto": this.nombreProducto,
      "precioUnitario":price,
      "cantidadProducto": cantidad,
    };

    this.isLoading = true;
    let res: ResApiInterface = await this._productService.postProduct(product);
    this.isLoading = false;

    if (!res.success) {
      console.error(res.message);

      this._widgetService.openSnackbar("Algo salió mal, intentalo más tarde");

    }

    let response: ResApiInterface = res.message;

    if(!response.success){
      this._widgetService.openSnackbar(response.message);

        return;
    }
    

    this._widgetService.openSnackbar(response.message);

  }
}
