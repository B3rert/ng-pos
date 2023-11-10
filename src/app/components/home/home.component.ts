import { Component } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ProductService,
  ]
})
export class HomeComponent {


  products: ProductInterface[] = [];

  constructor(private _productService: ProductService) {

    this.getProducts();

  }



  async getProducts() {

    let res: ResApiInterface = await this._productService.getProducts();


    if (!res.succes) {
      console.error(res.response);

      alert("Algo salio mal");
    }

    this.products = res.response;

    console.log(this.products);

  }


}
