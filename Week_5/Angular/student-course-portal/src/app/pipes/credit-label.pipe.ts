import { Pipe, PipeTransform } from '@angular/core';

// HANDS-ON 3, Task 3: custom pipe, pure by default (re-runs only when input reference changes)
@Pipe({ name: 'creditLabel', standalone: true })
export class CreditLabelPipe implements PipeTransform {
  transform(credits: number | null | undefined): string {
    if (!credits || credits <= 0) return 'No Credits';
    return credits === 1 ? '1 Credit' : `${credits} Credits`;
  }
}
