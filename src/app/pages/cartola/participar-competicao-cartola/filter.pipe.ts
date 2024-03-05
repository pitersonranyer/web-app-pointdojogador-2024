import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: string, search: string): string {
    if (!search) {
      return value;
    }
    const regex = new RegExp(search, 'gi');
    return value.replace(regex, match => `<mark>${match}</mark>`);
  }
}
