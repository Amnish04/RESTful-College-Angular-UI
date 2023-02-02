import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractFirstWord'
})
export class ExtractFirstWordPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value ? value.split(' ')[0] : null;
  }

}
