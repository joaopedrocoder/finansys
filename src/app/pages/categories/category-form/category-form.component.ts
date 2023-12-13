import { CategoryService } from './../services/category.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm()
  }

  //Ação é executada depois que toda a pagina
  //com todos os dados são carregados
  ngAfterContentChecked(): void {}

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
}
