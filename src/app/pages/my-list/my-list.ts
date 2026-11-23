import { Component, input } from '@angular/core';
import { TabItem, Tabs } from '../../shared/ui/tabs/tabs';

export type ListType = 'recommended' | 'saved' | 'dropped';

const MY_LIST_TABS: TabItem[] = [
  { title: 'Recommendations', path: '/my-list/recommended' },
  { title: 'Saved', path: '/my-list/saved' },
  { title: 'Dropped', path: '/my-list/dropped' },
];

@Component({
  imports: [Tabs],
  selector: 'app-my-list',
  styleUrl: './my-list.css',
  templateUrl: './my-list.html',
})
export class MyList {
  protected readonly myListTabs = MY_LIST_TABS

  readonly listType = input.required<ListType>()
}
