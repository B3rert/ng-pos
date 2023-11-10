import { Component } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers:[ProductService]
})
export class AddProductComponent {


 constructor(private _productService: ProductService) {

    this.postPorouct();

  }

  async postPorouct(){


      let product:ProductInterface = {
        "codigoProducto": "10001",
        "nombreProducto": "producto prueba",
        "precioUnitario": 9.5,
        "cantidadProducto": 1
    };

    let res: ResApiInterface = await this._productService.postProduct(product);


    if (!res.success) {
      console.error(res.message);

      alert("Algo salio mal");
    }


    console.log(res.message);
  }
}
