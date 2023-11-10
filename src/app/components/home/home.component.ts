import { Component } from '@angular/core';
import { DocumentInterface } from 'src/app/interfaces/document.interface';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { DocumentService } from 'src/app/services/document.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ProductService,
    DocumentService,
    TransactionService,
  ]
})
export class HomeComponent {


  products: ProductInterface[] = [];
  documents: DocumentInterface[] = [];

  constructor(private _productService: ProductService,
    private _documentService: DocumentService,
    private _transactionService:TransactionService,
    ) {}

  ngOnInit(): void {
    // this.getProducts();
this.getTransactionsByDoc();
  }



  async getProducts() {

    let res: ResApiInterface = await this._productService.getProducts();


    if (!res.success) {
      console.error(res.message);

      alert("Algo salio mal");
    }

    this.products = res.message;

    console.log(this.products);

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


}
