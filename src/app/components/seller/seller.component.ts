import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DocumentPostInterface } from 'src/app/interfaces/document.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { TransactionPostInterface } from 'src/app/interfaces/transaction.interface';
import { DocumentService } from 'src/app/services/document.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
  providers: [
    DocumentService, 
    TransactionService,
  ]
})
export class SellerComponent {

  constructor(
    private _documentService: DocumentService,
    private _transactionService: TransactionService
    ) {
  
    this.postTransaction();
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


