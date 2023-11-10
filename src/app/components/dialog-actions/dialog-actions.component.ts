import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogActionsInterface } from 'src/app/interfaces/dialog-actions.interface';

@Component({
  selector: 'app-dialog-actions',
  templateUrl: './dialog-actions.component.html',
  styleUrls: ['./dialog-actions.component.css']
})
export class DialogActionsComponent {
  constructor(
    //Declaracion de variables privadas
    public dialogRef: MatDialogRef<DialogActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogActionsInterface
  ) {
    //si hay dialogo
    if (!data.verdadero) {
      data.verdadero = "Aceptar";
    }
    //sino hay dialogo
    if (!data.falso) {
      data.falso = "Cancelar";
    }
  }
}
