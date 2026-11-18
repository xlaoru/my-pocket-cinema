import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface TabItem {
  title: string
  path: string
}

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-tabs',
  styleUrl: './tabs.css',
  templateUrl: './tabs.html',
})
export class Tabs {
  public items = input.required<TabItem[]>()
}
