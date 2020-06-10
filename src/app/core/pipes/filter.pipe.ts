import {Pipe, PipeTransform} from '@angular/core';

import {Hotel} from '../models/hotel.model';

const {isArray} = Array;

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(posts: Hotel[], find: string): Hotel[] {
    if (!posts) {
      return [];
    }
    if (!find) {
      return posts;
    }
    find = find.toLowerCase();
    return search(posts, find);
  }
}

function search(entries: any[], searchString: string) {
  searchString = searchString.toLowerCase();

  return entries.filter((obj) =>  {
    const keys: string[] = Object.keys(obj);
    return keys.some((key) => {
      if (key === 'name') {
        const value = obj[key];
        if (isArray(value)) {
          return value.some(v => {
            return v.toLowerCase().includes(searchString);
          });
        } else if (!isArray(value)) {
          return value.toLowerCase().includes(searchString);
        }
      }
    });
  });
}
