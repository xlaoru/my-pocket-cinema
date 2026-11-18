import { Component, inject, signal, } from '@angular/core';
import { TabItem, Tabs } from '../../shared/ui/tabs/tabs';
import { Input } from '../../shared/ui/input/input';
import { Button } from '../../shared/ui/button/button';
import { Router, RouterLink } from '@angular/router';

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
  private readonly router = inject(Router)

  protected readonly headerTabs = HEADER_TABS

  public searchValue = signal<string>('')

  onSearch(event: Event) {
    event.preventDefault()

    const movie = this.searchValue().trim()

    if (!movie) {
      return
    }

    this.router.navigate(['/all-movies'], {
      queryParams: { movie }
    })
  }
}
