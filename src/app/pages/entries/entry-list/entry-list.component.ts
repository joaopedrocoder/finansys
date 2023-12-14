import { Component } from '@angular/core';
import { Entry } from '../models/entry.model';
import { EntriesService } from '../services/entries.service';

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

  
  listEntries() {
    this.entryService.getAll().subscribe({
      next: (response) => (this.entries = response),
      error: (err) => console.log(err),
    });
  }
  deleteEntry(id?: number): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete && id)
      this.entryService.delete(id).subscribe({
        next: (response) =>
          (this.entries = this.entries.filter(
            (category) => category.id !== id
          )),
        error: (err) => console.log(err),
      });
  }
}
