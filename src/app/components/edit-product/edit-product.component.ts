import { Component } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers:[ProductService]
})
export class EditProductComponent {
  constructor(private _productService: ProductService) {

    this.putPorouct();

  }

  async putPorouct(){


      let product:ProductInterface = {
        "codigoProducto": "10001",
        "nombreProducto": "producto prueba",
        "precioUnitario": 9.5,
        "cantidadProducto": 1
    };

    let res: ResApiInterface = await this._productService.putProduct(product);


    if (!res.succes) {
      console.error(res.response);

      alert("Algo salio mal");
    }


    console.log(res.response);
  }
}