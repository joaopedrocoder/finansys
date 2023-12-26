
import { map } from 'rxjs';
import { BaseResource } from '../../models/base-resource.model';
import { Directive } from '@angular/core';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResource> {
  resources: T[] = [];
  
  constructor(private resourceService: BaseResourceService<T>) {}

  ngOnInit(): void {
    this.listEntries()
  }

  // sortResource(a: any, b: any) {
  //   const nameA = a.name.toUpperCase();
  //   const nameB = b.name.toUpperCase();
  //   return nameA.localeCompare(nameB);
  // }
  
  listEntries() {
    this.resourceService.getAll()
      // .pipe(
      //   map(resource => resource.sort(this.sortResource))
      // )
      .subscribe({
        next: (response) => this.resources = response,
        error: (err) => console.log(err),
      });
  }
  deleteEntry(id?: number): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete && id)
      this.resourceService.delete(id).subscribe({
        next: (response) => this.resources = this.resources.filter((resource) => resource.id !== id),
        error: (err) => {
          alert('Erro ao tentar excluir')
          console.log(err)
        },
      });
  }
}
