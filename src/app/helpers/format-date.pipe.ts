import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return new Date(value * 1000).toLocaleDateString('ca-es', { weekday:"long", year:"2-digit", month:"short", day:"numeric"}) 
  }

}
