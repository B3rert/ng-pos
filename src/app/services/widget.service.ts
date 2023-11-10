import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class WidgetsService {


    //Inicializar snack
    constructor(
        private _snackBar: MatSnackBar,
        // private _dialog: MatDialog,
    ) {
    }

    //Abrir o mostar  snackbar
    openSnackbar(message: string) {
        this._snackBar.open(message, "Aceptar", { duration: 5 * 1000 })
    }

    //Abrir dialogo antes de cerrar sesion o salir
    // openDialogActions(data: DialogActionInterface): Promise<boolean> {
    //     return new Promise((resolve, reject) => {
    //         const dialogRef = this._dialog.open(DialogActionsComponent, {
    //             data: {
    //                 title: data.title,
    //                 description: data.description,
    //                 verdadero: data.verdadero,
    //                 falso: data.falso
    //             }
    //         });
    //         dialogRef.afterClosed().subscribe(result => {
    //             if (result) {
    //                 resolve(true);
    //             } else {
    //                 resolve(false);
    //             }
    //         });
    //     });
    // }

}