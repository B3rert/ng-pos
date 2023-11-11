import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if (isNaN(value)) {
      return 'Q. 0.00';
    }

    // Formatear el número como moneda con el símbolo "Q", comas y dos decimales
    const formattedValue = `Q. ${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
    return formattedValue;
  }

}
