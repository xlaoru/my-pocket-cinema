import { Component, input, model } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-input',
  styleUrl: './input.css',
  templateUrl: './input.html',
})
export class Input {
  public value = model<string>('')
  public placeholder = input.required<string>()

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value)
  }
}
