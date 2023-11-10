import { Component } from '@angular/core';
import { DocumentPostInterface } from 'src/app/interfaces/document.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
  providers: [DocumentService]
})
export class SellerComponent {

  constructor(private _documentService: DocumentService) {
    this.postDocument();
  }

  async postDocument() {


    let date = new Date();

    let document: DocumentPostInterface = {
      "fecha": date,
      "titulo": "Nuevo Documento",
      "usuario": "ejemploUsuario"
    };


    let res: ResApiInterface = await this._documentService.postDocument(document);


    if (!res.succes) {
      console.error(res.response);

      alert("Algo salio mal");
    }

    console.log(res.response);


  }
}
