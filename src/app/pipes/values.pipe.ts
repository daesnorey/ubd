import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {

  transform(map: Map<any, any>, args?: any): any {
    const ret = [];

    map.forEach((val, key) => {
        ret.push({
            id: key,
            name: val
        });
    });

    return ret;
  }

}
