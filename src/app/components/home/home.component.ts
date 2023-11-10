import { Component } from '@angular/core';
import { DocumentInterface } from 'src/app/interfaces/document.interface';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { DocumentService } from 'src/app/services/document.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ProductService,
    DocumentService,
  ]
})
export class HomeComponent {


  products: ProductInterface[] = [];
  documents: DocumentInterface[] = [];

  constructor(private _productService: ProductService,
    private _documentService: DocumentService) {}

  ngOnInit(): void {
    // this.getProducts();
    this.getDocumentsByUser();

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

  async getDocuments() {

    let res: ResApiInterface = await this._documentService.getDocuments();


    if (!res.succes) {
      console.error(res.response);

      alert("Algo salio mal");
    }

    this.documents = res.response;

    console.log(this.documents);

  }


  async getDocumentsByUser() {

    let res: ResApiInterface = await this._documentService.getDocumentsByUser("b3rert");


    if (!res.succes) {
      console.error(res.response);

      alert("Algo salio mal");
    }

    this.documents = res.response;

    console.log(this.documents);

  }

  async deleteProduct() {

    let res: ResApiInterface = await this._productService.deleteProduct("1000");


    if (!res.succes) {
      console.error(res.response);

      alert("Algo salio mal");
    }


    console.log(res.response);

  }


}
