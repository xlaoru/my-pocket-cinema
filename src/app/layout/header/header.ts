import { Component, signal, } from '@angular/core';
import { TabItem, Tabs } from '../../shared/ui/tabs/tabs';
import { Input } from '../../shared/ui/input/input';
import { Button } from '../../shared/ui/button/button';
import { RouterLink } from '@angular/router';

const HEADER_TABS: TabItem[] = [
  { title: 'Recommendations', path: '/' },
  { title: 'My list', path: '/my-list' },
];

@Component({
  imports: [Tabs, Input, Button, RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  protected readonly headerTabs = HEADER_TABS

  public searchValue = signal<string>('')
}
