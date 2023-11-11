import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductInterface } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.css']
})
export class DialogAddComponent {
  cantidad: number = 0;
  /**
   *
   */
  constructor(
    public dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductInterface
  ) {

  }


  removeCantidad() {
    if (this.cantidad == 0)
      return;
    this.cantidad--;

  }

  addCantidad() {
    this.cantidad++;
  }

}
