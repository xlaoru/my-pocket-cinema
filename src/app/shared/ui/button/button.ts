import { NgClass } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inline' | 'icon' | 'rating';
export type ButtonSize = 'md' | 'sm';

@Component({
  imports: [NgClass],
  selector: 'app-button',
  styleUrl: './button.css',
  templateUrl: './button.html',
})
export class Button {
  public variant = input<ButtonVariant>('primary');
  public size = input<ButtonSize>('md');
  public type = input<'button' | 'submit' | 'reset'>('button');

  public block = input(false, { transform: booleanAttribute });
  public active = input(false, { transform: booleanAttribute });
  public danger = input(false, { transform: booleanAttribute });
  public filled = input(false, { transform: booleanAttribute });
  public disabled = input(false, { transform: booleanAttribute });
}
