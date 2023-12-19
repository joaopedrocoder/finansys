import { CategoryService } from './../services/category.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { idGenerator } from '../../../shared/utils/idGenerator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  currentAction = '';
  categoryForm!: FormGroup;
  pageTitle = '';
  serverErrorMessage: string[] = [];
  submittingForm = false;
  category: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm()
    this.loadCategory()
  }

  //Ação é executada depois que toda a pagina
  //com todos os dados são carregados
  ngAfterContentChecked(): void {
    this.setPageTitle()
  }

  setCurrentAction(): void {
    this.route.snapshot.url[0].path === 'new'
      ? (this.currentAction = 'new')
      : (this.currentAction = 'edit');
  }

  buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
    });
  }

  loadCategory(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.categoryService.getById(Number(params.get('id')))
          )
        )
        .subscribe({
          next: (response) => {
            this.category = response;
            this.categoryForm?.patchValue(response);
          },
          error: (err) => console.log(err),
        });
    }
  }

  setPageTitle(): void {
    if(this.currentAction === 'new'){
      this.pageTitle = 'Cadastro de nova categoria'
    }else {
      const categoryName = this.category?.name || ''
      this.pageTitle = 'Editando Categoria: ' + categoryName
    }
    // this.currentAction === 'new'
    //   ? (this.pageTitle = 'Cadastro de nova categoria')
    //   : this.category?.name
    //   ? (this.pageTitle = `Editando Categoria: ${this.category?.name}`)
    //   : (this.pageTitle = `Editando Categoria:`);
  }

  createCategory(): void {
    const newId = idGenerator()
    const newCategory: Category = {...this.categoryForm.value, id: newId}
    
    this.categoryService.create(newCategory)
      .subscribe({
        next: response => this.actionsForSuccess(response),
        error: err => this.actionsForError(err)
      })
  }

  updateCategory(): void {
    const newCategory: Category = {...this.categoryForm.value}

    this.categoryService.update(newCategory)
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
      this.createCategory()
    }else {
      this.updateCategory()
      this.router.navigate(['categories'])
    }
  }

  actionsForSuccess(category: Category): void {
    this.toastr.success('Solicitação realizada com sucesso!')

    //redirect and reload component page
    this.router.navigateByUrl('categories', {skipLocationChange: true})
      .then(() => this.router.navigate(['categories', category.id, 'edit']))
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
