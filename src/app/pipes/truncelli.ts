import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncEllipsis' })
export class TruncateAndEllipsis implements PipeTransform {
  transform(input: string, length: number): string {
      if (input.length <= length) {
          return input;
      } else {
          return input.substring(0, length - 3) + '...';
      }
  }
}
