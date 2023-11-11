import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentInterface } from 'src/app/interfaces/document.interface';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { DataService } from 'src/app/services/data.service';
import { DocumentService } from 'src/app/services/document.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { WidgetsService } from 'src/app/services/widget.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from 'src/app/pipes/currency.pipe';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { UserService } from 'src/app/services/user.service';
import { TransactionInterface } from 'src/app/interfaces/transaction.interface';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ProductService,
    DocumentService,
    TransactionService,
    WidgetsService,
    CurrencyPipe,
  ]
})
export class HomeComponent {


  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = []; // Lista filtrada
  documents: DocumentInterface[] = [];
  granTotal: number = 0;
  isLoading: boolean = false;
  searchText: string = ''; // Texto de búsqueda

  constructor(
    private _productService: ProductService,
    private _documentService: DocumentService,
    private _transactionService: TransactionService,
    private _widgetService: WidgetsService,
    private _router: Router,
    private _dataService: DataService,
    private _http: HttpClient,
    private _currencyPipe: CurrencyPipe,

  ) { }

  ngOnInit(): void {
    this.getProducts();
  }


  //Convierte una imagen dada en base64 la gurada en imageBase64

  logo_empresa: any;
  imageBase64: any;

  async generateBase64(source: string): Promise<void> {
    this.imageBase64 = "";
    return new Promise((resolve, reject) => {
      this._http.get(source, { responseType: 'blob' })
        .subscribe(res => {
          const reader = new FileReader();
          reader.onloadend = () => {
            var base64data = reader.result;
            this.imageBase64 = base64data;
            //   console.log(base64data);
            resolve();
          }
          reader.readAsDataURL(res);
          //console.log(res);
        });
    });
  }

  formatFecha(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // ¡Recuerda que los meses comienzan desde 0!
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }


  //Genera un PDF
  async reportProducts() {


    await this.generateBase64('/assets/logo.png');
    this.logo_empresa = this.imageBase64;



    let table: any[] = [
      [
        {
          text: "Codigo",
          style: {
            bold: true,
            color: "#0066CC",
            alignment: 'left',
            fontSize: 11
          },
        },
        {
          text: "Nombre",
          style: {
            bold: true,
            color: "#0066CC",
            alignment: 'left',
            fontSize: 11
          },
        },
        {
          text: "Precio U",
          style: {
            bold: true,
            color: "#0066CC",
            alignment: 'left',
            fontSize: 11
          },
        },
        {
          text: "Cantidad",
          style: {
            bold: true,
            color: "#0066CC",
            alignment: 'left',
            fontSize: 11
          },
        },
      ],
    ];


    this.products.forEach(product => {
      let row = [
        product.codigoProducto,
        product.nombreProducto,
        this._currencyPipe.transform(product.precioUnitario),
        product.cantidadProducto,
      ]
      table.push(row);
    });


    let date: Date = new Date();

    var docDefinition: TDocumentDefinitions = {

      content: [
        {
          image: this.logo_empresa,
          width: 115,
          absolutePosition: { x: 460, y: 10 }
        },
        {
          text: "Catalogo de productos",
          style: {
            bold: true,
            fontSize: 15,
          }
        },
        {
          text: "B3rert - Distribuidora de lacteos",
          style: {
            color: "#942545"
          }
        },
        {
          text: this.formatFecha(date),
          style: {
            alignment: "right"
          }
        },
        {
          text: `${UserService.getUser()!.toUpperCase()}\n\n`,
          style: {
            alignment: "right"
          }
        },
        {
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['15%', '35%', '25%', '25%'],
            body: table

          },
        },
        {
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['80%', '20%'],
            body: [
              ["", ""],
              [{
                text: "Total:",
                fontSize: 13,
                bold: true,
                color: "#860d0d"

              },
              {
                text: this._currencyPipe.transform(this.granTotal),
                fontSize: 13,
                bold: true,
                color: "#860d0d",
                alignment: "right"
              },]
            ]
          },
        },
      ],

    };

    pdfMake.createPdf(docDefinition).open();




  }


  //Genera un PDF
  async reportDocuments() {

    await this.getDocumentsByUser();

    await this.generateBase64('/assets/logo.png');
    this.logo_empresa = this.imageBase64;



    let table: any[] = [
      [
        {
          text: "Documento",
          style: {
            bold: true,
            color: "#0066CC",
            alignment: 'left',
            fontSize: 11
          },
        },
        {
          text: "Tipo",
          style: {
            bold: true,
            color: "#0066CC",
            alignment: 'left',
            fontSize: 11
          },
        },
        {
          text: "Fecha",
          style: {
            bold: true,
            color: "#0066CC",
            alignment: 'left',
            fontSize: 11
          },
        },

      ],
    ];


    this.documents.forEach(doc => {
      let fecha: Date = new Date(doc.fecha);
      let row = [
        doc.id,
        doc.titulo,
        this.formatFecha(fecha),
      ]
      table.push(row);
    });


    let date: Date = new Date();

    var docDefinition: TDocumentDefinitions = {

      content: [
        {
          image: this.logo_empresa,
          width: 115,
          absolutePosition: { x: 460, y: 10 }
        },
        {
          text: "Resumido documentos por usuario",
          style: {
            bold: true,
            fontSize: 15,
          }
        },
        {
          text: "B3rert - Distribuidora de lacteos",
          style: {
            color: "#942545"
          }
        },
        {
          text: this.formatFecha(date),
          style: {
            alignment: "right"
          }
        },
        {
          text: `${UserService.getUser()!.toUpperCase()}\n\n`,
          style: {
            alignment: "right"
          }
        },
        {
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['20%', '40%', '40%'],
            body: table
          },
        },

      ],

    };

    pdfMake.createPdf(docDefinition).open();

  }


  //Genera un PDF
  async reportDocumentsDetails() {

    let tables: any[] = [];

    await this.getDocumentsByUser();

    for (const doc of this.documents) {


      let table: any[] = [
        [
          {
            text: "Documento",
            style: {
              bold: true,
              color: "#0066CC",
              alignment: 'left',
              fontSize: 11
            },
          },
          {
            text: "Tipo",
            style: {
              bold: true,
              color: "#0066CC",
              alignment: 'left',
              fontSize: 11
            },
          },
          {
            text: "Fecha",
            style: {
              bold: true,
              color: "#0066CC",
              alignment: 'left',
              fontSize: 11
            },
          },

        ],
      ];



      let fecha: Date = new Date(doc.fecha);
      let row = [
        doc.id,
        doc.titulo,
        this.formatFecha(fecha),
      ]

      table.push(row);
      tables.push({ text: "\n\n" });
      tables.push({
        layout: 'headerLineOnly',
        table: {
          headerRows: 1,
          widths: ['20%', '40%', '40%'],
          body: table
        },
      },);

      let tra = await this.getTransactionsByDoc(doc.id);


      let tableTra: any[] = [
        [
          {
            text: "Transaccion",
            style: {
              bold: true,
              color: "#0066CC",
              alignment: 'left',
              fontSize: 11
            },
          },
          {
            text: "Producto",
            style: {
              bold: true,
              color: "#0066CC",
              alignment: 'left',
              fontSize: 11
            },
          },
          {
            text: "Cantidad vendida",
            style: {
              bold: true,
              color: "#0066CC",
              alignment: 'left',
              fontSize: 11
            },
          },
          {
            text: "Precio U",
            style: {
              bold: true,
              color: "#0066CC",
              alignment: 'left',
              fontSize: 11
            },
          },
          {
            text: "Total",
            style: {
              bold: true,
              color: "#0066CC",
              alignment: 'left',
              fontSize: 11
            },
          },

        ],
      ];

      tra.forEach(element => {


        let rowTra = [
          element.id,
          element.codigoProducto,
          element.cantidadVendida,
          this._currencyPipe.transform(element.precioUnitario),
          this._currencyPipe.transform(element.precioUnitario * element.cantidadVendida),
        ]

        tableTra.push(rowTra);

      });




      if(tra.length > 0){
        tables.push({
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['20%', '20%', '20%', '20%', '20%'],
            body: tableTra
          }
        });
      }
    }

    await this.generateBase64('/assets/logo.png');
    this.logo_empresa = this.imageBase64;



    let date: Date = new Date();

    var docDefinition: TDocumentDefinitions = {

      content: [
        {
          image: this.logo_empresa,
          width: 115,
          absolutePosition: { x: 460, y: 10 }
        },
        {
          text: "Detalado documentos por usuario",
          style: {
            bold: true,
            fontSize: 15,
          }
        },
        {
          text: "B3rert - Distribuidora de lacteos",
          style: {
            color: "#942545"
          }
        },
        {
          text: this.formatFecha(date),
          style: {
            alignment: "right"
          }
        },
        {
          text: `${UserService.getUser()!.toUpperCase()}`,
          style: {
            alignment: "right"
          }
        },
        tables,


      ],

    };

    pdfMake.createPdf(docDefinition).open();

  }


  seller() {
    this._router.navigate(["seller"]);

  }

  create() {
    this._router.navigate(["add"]);
  }

  editProduct(product: ProductInterface) {
    this._router.navigate(['/edit']);

    this._dataService.setSharedData(product);
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


    this.products.forEach(element => {
      this.granTotal = (element.cantidadProducto * element.precioUnitario) + this.granTotal;
    });

  }



  async getDocumentsByUser() {

    this.isLoading = true;
    let res: ResApiInterface = await this._documentService.getDocumentsByUser(UserService.getUser()!);
    this.isLoading = false;

    if (!res.success) {
      console.error(res.message);

      this._widgetService.openSnackbar("Algo salio mal");
    }

    this.documents = res.message;


  }


  async getTransactionsByDoc(doc: number) {

    let res: ResApiInterface = await this._transactionService.getTransactionsByDoc(doc);


    if (!res.success) {
      console.error(res.message);

      alert("Algo salio mal");
    }

    let transactions: TransactionInterface[] = res.message;

    return transactions;

  }
  async deleteProduct(index: number) {

    //dialog confurmar cierre de sesion
    let verificador = await this._widgetService.openDialogActions({
      title: "Eliminar producto",
      description: "Esta acción no se peude revertir, ¿Estás seguro?",
      verdadero: "Aceptar",
      falso: "Cancelar",
    });

    if (!verificador) return;


    this.isLoading = true;

    let res: ResApiInterface = await this._productService.deleteProduct(this.products[index].codigoProducto);

    this.isLoading = false;

    if (!res.success) {
      console.error(res.message);

      this._widgetService.openSnackbar("Algo salio mal, intentalo más tarde.");
    }


    this.products.splice(index, 1);


    this._widgetService.openSnackbar("Producto eliminado correctamente.");

  }


  //Cerra sesion
  async logOut() {

    //dialog confurmar cierre de sesion
    let verificador = await this._widgetService.openDialogActions({
      title: "Cerrar sesión",
      description: "Se perderán los datos que no han sido guardados ¿Estás seguro?",
      verdadero: "Aceptar",
      falso: "Cancelar",
    });

    if (!verificador) return;
    //Limpiar datos del storage
    localStorage.clear();
    sessionStorage.clear();
    //return to login and delete de navigation route
    this._router.navigate(['/login']);
  }


}
