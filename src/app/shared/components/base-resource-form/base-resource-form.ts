import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { idGenerator } from '../../utils/idGenerator';
import { ToastrService } from 'ngx-toastr';
import { BaseResource } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { Directive, Injector } from '@angular/core';

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResource> {
  currentAction = '';
  resourceForm!: FormGroup;
  pageTitle = '';
  serverErrorMessage: string[] = [];
  submittingForm = false;

  protected route: ActivatedRoute
  protected router: Router
  protected formBuilder: FormBuilder
  protected toastr: ToastrService

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
  ) {
    this.route = this.injector.get(ActivatedRoute)
    this.router = this.injector.get(Router)
    this.formBuilder = this.injector.get(FormBuilder)
    this.toastr = this.injector.get(ToastrService)
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm()
    this.loadResource()
  }

  //Ação é executada depois que toda a pagina
  //com todos os dados são carregados
  ngAfterContentChecked(): void {
    this.setPageTitle()
  }

  protected setCurrentAction(): void {
    this.route.snapshot.url[0].path === 'new'
      ? (this.currentAction = 'new')
      : (this.currentAction = 'edit');
  }

  protected abstract buildResourceForm(): void 

  loadResource(): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) =>
            this.resourceService.getById(Number(params.get('id')))
          )
        )
        .subscribe({
          next: (response) => {
            this.resource = response;
            this.resourceForm?.patchValue(response);
          },
          error: (err) => console.log(err),
        });
    }
  }

  protected setPageTitle(): void {
    if(this.currentAction === 'new'){
      this.pageTitle = this.creationPageTitle()
    }else {
      this.pageTitle = this.editionPageTitle()
    }

  }

  protected createResource(): void {
    const newId = idGenerator()
    const newResource: T = {...this.resourceForm.value, id: newId}
    
    this.resourceService.create(newResource)
      .subscribe({
        next: response => this.actionsForSuccess(response),
        error: err => this.actionsForError(err)
      })
  }

  protected updateResource(): void {
    const newResource: T = {...this.resourceForm.value}

    this.resourceService.update(newResource)
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
      this.createResource()
    }else {
      this.updateResource()
      this.router.navigate(['categories'])
    }
  }

  protected actionsForSuccess(resource: T): void {
    this.toastr.success('Solicitação realizada com sucesso!')

    const baseComponentPath = this.route.parent?.snapshot.url[0].path

    //redirect and reload component page
    this.router.navigateByUrl(baseComponentPath ?? '', {skipLocationChange: true})
      .then(() => this.router.navigate([baseComponentPath, resource.id, 'edit']))
  }

  protected actionsForError(error: any): void {
    this.toastr.error('Ocorreu um erro ao processar a solicitação!')

    this.submittingForm = false

    if(error.status === 422){
      this.serverErrorMessage = JSON.parse(error._body).erros
    }else {
      this.serverErrorMessage = ["Falha na comunicação com o servidor. Tente mais tarde!"]
    }
  }

  protected creationPageTitle(): string {
    return 'Novo'
  }

  protected editionPageTitle(): string {
    return 'Edição'
  }
}
