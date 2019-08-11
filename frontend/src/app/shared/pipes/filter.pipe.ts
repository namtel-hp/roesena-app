import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: string[], filter: string): string[] {
    // only return the elements that contain the search string
    items = items.filter( el => el.toLowerCase().includes(filter.toLowerCase()));
    return items;
  }

}
