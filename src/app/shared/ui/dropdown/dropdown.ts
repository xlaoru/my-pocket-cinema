import { Component, input, model } from '@angular/core';

export interface DropdownItem<T extends string = string> {
  title: string
  value: T
}

@Component({
  imports: [],
  selector: 'app-dropdown',
  styleUrl: './dropdown.css',
  templateUrl: './dropdown.html',
})
export class Dropdown<T extends string = string> {
  public items = input.required<DropdownItem<T>[]>()
  public value = model.required<T>()

  onChange(event: Event) {
    this.value.set((event.target as HTMLSelectElement).value as T)
  }
}
