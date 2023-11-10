import { DocumentInterface } from "./document.interface";

export interface TransactionInterface {
    id:              number;
    documento:       DocumentInterface;
    codigoProducto:  string;
    cantidadVendida: number;
    precioUnitario:  number;
    usuario:         string;
}


export interface TransactionPostInterface {
    documento:       DocumentInterface;
    codigoProducto:  string;
    cantidadVendida: number;
    precioUnitario:  number;
    usuario:         string;
}