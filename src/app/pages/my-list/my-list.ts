import { Component, effect, inject, input } from '@angular/core';
import { TabItem, Tabs } from '../../shared/ui/tabs/tabs';
import { MyListService } from '../../core/services/my-list';
import { ListStatus } from '../../core/models/my-list';
import { Loader } from '../../shared/ui/loader/loader';
import { Button } from '../../shared/ui/button/button';

export type ListType = 'recommended' | 'saved' | 'dropped';

const MY_LIST_TABS: TabItem[] = [
  { title: 'Recommendations', path: '/my-list/recommended' },
  { title: 'Saved', path: '/my-list/saved' },
  { title: 'Dropped', path: '/my-list/dropped' },
];

const LIST_TYPE_TO_STATUS: Record<ListType, ListStatus> = {
  recommended: 'recommend',
  saved: 'saved',
  dropped: 'dropped',
};

@Component({
  imports: [Tabs, Loader, Button],
  selector: 'app-my-list',
  styleUrl: './my-list.css',
  templateUrl: './my-list.html',
})
export class MyList {
  protected readonly myList = inject(MyListService)

  protected readonly myListTabs = MY_LIST_TABS

  readonly listType = input.required<ListType>()

  protected readonly items = this.myList.list.items

  constructor() {
    effect(() => {
      this.myList.listStatus.set(LIST_TYPE_TO_STATUS[this.listType()])
    })
  }
}
