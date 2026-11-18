import { Component, input, output } from '@angular/core';

interface Item {
  title: string
  value: string
}

@Component({
  imports: [],
  selector: 'app-tabs',
  styleUrl: './tabs.css',
  templateUrl: './tabs.html',
})
export class Tabs {
  public items = input.required<Item[]>()
  public activeTab = input.required<string>()

  public tabChanged = output<string>()

  selectTab(value: string) {
    this.tabChanged.emit(value)
  }
}
