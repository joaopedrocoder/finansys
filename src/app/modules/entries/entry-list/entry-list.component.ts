import { Component } from '@angular/core';
import { Entry } from '../models/entry.model';
import { EntriesService } from '../services/entries.service';
import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.scss'
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {
  
  constructor(
    private entryService: EntriesService
  ) {
    super(entryService)
  }


  // sortEntries(a: any, b: any) {
  //   const nameA = a.name.toUpperCase();
  //   const nameB = b.name.toUpperCase();
  //   return nameA.localeCompare(nameB);
  // }
  
}
