import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtime',
})
export class RuntimePipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (minutes == null) {
      return '';
    }

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
}
