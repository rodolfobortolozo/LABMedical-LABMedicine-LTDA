import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lpad',
})
export class LpadPipe implements PipeTransform {
  transform(value: string | number): string {
    let valorFormatado = value + '';

    valorFormatado = ('0000000000' + value).slice(-10);

    return valorFormatado;
  }
}
