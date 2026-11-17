import { Component, input } from '@angular/core';

export type LoaderSize = 'sm' | 'md' | 'lg';

@Component({
  imports: [],
  selector: 'app-loader',
  styleUrl: './loader.css',
  templateUrl: './loader.html',
  host: {
    role: 'status',
    'aria-live': 'polite',
    '[class]': "'loader-' + size()",
  },
})
export class Loader {
  public size = input<LoaderSize>('md');
  public label = input<string>('Loading…');

  protected readonly holes = [0, 72, 144, 216, 288];
}
