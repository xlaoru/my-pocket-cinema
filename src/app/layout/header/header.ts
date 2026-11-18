import { Component, signal } from '@angular/core';
import { TabItem, Tabs } from '../../shared/ui/tabs/tabs';
import { Input } from '../../shared/ui/input/input';
import { Button } from '../../shared/ui/button/button';

const HEADER_TABS: TabItem[] = [
  { title: 'Recommendations', value: 'recommendations' },
  { title: 'My list', value: 'my-list' },
];

@Component({
  imports: [Tabs, Input, Button],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  protected readonly headerTabs = HEADER_TABS

  public activeTab = signal<string>('recommendations')
  public searchValue = signal<string>('')

  onTabChanged(newActiveTab: string) {
    this.activeTab.set(newActiveTab)
  }
}
