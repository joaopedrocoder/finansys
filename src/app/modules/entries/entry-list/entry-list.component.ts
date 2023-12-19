import { Component } from '@angular/core';
import { Entry } from '../models/entry.model';
import { EntriesService } from '../services/entries.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.scss'
})
export class EntryListComponent {
  entries: Entry[] = [];
  
  constructor(private entryService: EntriesService) {}

  ngOnInit(): void {
    this.listEntries()
  }

  sortEntries(a: any, b: any) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    return nameA.localeCompare(nameB);
  }
  
  listEntries() {
    this.entryService.getAll()
      .pipe(
        map(entries => entries.sort(this.sortEntries))
      )
      .subscribe({
        next: (response) => this.entries = response,
        error: (err) => console.log(err),
      });
  }
  deleteEntry(id?: number): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete && id)
      this.entryService.delete(id).subscribe({
        next: (response) => this.entries = this.entries.filter((category) => category.id !== id),
        error: (err) => console.log(err),
      });
  }
}
