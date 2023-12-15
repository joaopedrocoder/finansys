import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entry } from '../models/entry.model';
import { EntriesService } from '../services/entries.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { idGenerator } from '../../../shared/utils/idGenerator';
import { PrimeNGConfig } from 'primeng/api';
import { Category } from '../../categories/models/category.model';
import { CategoryService } from '../../categories/services/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.scss'
})
export class EntryFormComponent {
  currentAction = '';
  entryForm!: FormGroup;
  pageTitle = '';
  serverErrorMessage: string[] = [];
  submittingForm = false;
  entry: Entry | null = null;
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
    private entryService: EntriesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private config: PrimeNGConfig,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
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

    this.setCurrentAction();
    this.buildEntryForm()
    this.loadEntry()
    this.loadcategories()
  }

  //Ação é executada depois que toda a pagina
  //com todos os dados são carregados
  ngAfterContentChecked(): void {
    this.setPageTitle()
  }

  setCurrentAction(): void {
    this.currentAction = this.route.snapshot.url[0].path === 'new' 
      ? 'new':'edit'
    // this.route.snapshot.url[0].path === 'new'
    //   ? this.currentAction = 'new'
    //   : this.currentAction = 'edit'
  }

  buildEntryForm(): void {
    this.entryForm = this.formBuilder.group({
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

  loadEntry(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.entryService.getById(Number(params.get('id')))
          )
        )
        .subscribe({
          next: (response) => {
            this.entry = response;
            this.entryForm?.patchValue({...response, paid: response.paid});
          },
          error: (err) => console.log(err),
        });
    }
  }

  get typeOptions(): any[] {
    return Object.entries(Entry.types).map(([value, text]) => {
      return { text, value }
    })
  }

  private setPageTitle(): void {
    if(this.currentAction === 'new'){
      this.pageTitle = 'Cadastro de novo lançamento'
    }else {
      const entriesName = this.entry?.name ?? ''
      this.pageTitle = 'Editando Lançamento: ' + entriesName
    }
  }

  private loadcategories(): void {
    this.categoryService.getAll().subscribe({
      next: response => this.categories = response,
      error: (err: any) => console.log(err)
    })
  }

  createEntry(): void {
    const newId = idGenerator()
    const newEntry: Entry = {...this.entryForm.value, id: newId}
    
    this.entryService.create(newEntry)
      .subscribe({
        next: response => this.actionsForSuccess(response),
        error: err => this.actionsForError(err)
      })
  }

  updateEntry(): void {
    const newEntry: Entry = {...this.entryForm.value}

    this.entryService.update(newEntry)
      .subscribe({
        next: response => {
          if(Object.entries(response).length > 0) {
            this.toastr.success('Solicitação realizada com sucesso!')
          }
        },
        error: err => this.actionsForError(err)
      })
  }

  submitForm(): void {
    this.submittingForm = true

    if(this.currentAction === 'new'){
      this.createEntry()
    }else {
      this.updateEntry()
      this.router.navigate(['entries'])
    }
  }

  actionsForSuccess(entry: Entry): void {
    this.toastr.success('Solicitação realizada com sucesso!')

    //redirect and reload component page
    this.router.navigateByUrl('entries', {skipLocationChange: true})
      .then(() => this.router.navigate(['entries', entry.id, 'edit']))
  }

  actionsForError(error: any): void {
    this.toastr.error('Ocorreu um erro ao processar a solicitação!')

    this.submittingForm = false

    if(error.status === 422){
      this.serverErrorMessage = JSON.parse(error._body).erros
    }else {
      this.serverErrorMessage = ["Falha na comunicação com o servidor. Tente mais tarde!"]
    }
  }


}
