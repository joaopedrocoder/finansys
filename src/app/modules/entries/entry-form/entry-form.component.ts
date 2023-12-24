import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Entry } from '../models/entry.model';
import { EntriesService } from '../services/entries.service';

import { PrimeNGConfig } from 'primeng/api';

import { Category } from '../../categories/models/category.model';
import { CategoryService } from '../../categories/services/category.service';
import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.scss'
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> {
  categories: Category[] = []

  iMaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  }

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo, Segunda, Terça, quarta, Quinta, Sexta, Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
  }

  constructor(
    protected entryService: EntriesService,
    private config: PrimeNGConfig,
    protected categoryService: CategoryService,
    protected override injector: Injector
  ) {
    super(injector, new Entry(), entryService)
  }

  override ngOnInit(): void {
    this.config.setTranslation({
      dayNames: ['Domingo, Segunda, Terça, quarta, Quinta, Sexta, Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      dateFormat: 'dd/mm/yy',
      firstDayOfWeek: 0,
      today: 'Hoje',
      clear: 'Limpar' 
    })
    this.loadCategories()
    super.ngOnInit()
  }


  protected override buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  get typeOptions(): any[] {
    return Object.entries(Entry.types).map(([value, text]) => {
      return { text, value }
    })
  }


  private loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: response => this.categories = response,
      error: (err: any) => console.log(err)
    })
  }

  protected override creationPageTitle(): string {
    return 'Cadastro de Novo Lançamento'
  }

  protected override editionPageTitle(): string {
    const entrieName = this.resource.name ?? ''
    return 'Editando Lançamento: ' + entrieName
  }

}
