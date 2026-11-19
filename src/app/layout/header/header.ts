import { Component, inject, linkedSignal, signal, } from '@angular/core';
import { TabItem, Tabs } from '../../shared/ui/tabs/tabs';
import { Input } from '../../shared/ui/input/input';
import { Button } from '../../shared/ui/button/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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
  private readonly route = inject(ActivatedRoute)

  protected readonly headerTabs = HEADER_TABS

  private readonly movieFromUrl = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('query') ?? '')),
    { initialValue: '' },
  )

  public searchValue = linkedSignal(() => this.movieFromUrl())

  onSearch(event: Event) {
    event.preventDefault()

    const movie = this.searchValue().trim()

    if (!movie) {
      this.router.navigate(['/'])
      return
    }

    this.router.navigate(['/movies'], {
      queryParams: { query: movie }
    })
  }
}
