import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'splitAndGet' })
export class SplitAndGetPipe implements PipeTransform {
  transform(input: string, separator: string, index: number): string {
    return input.split(separator)[index];
  }
}
