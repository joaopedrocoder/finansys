import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrl: './form-field-error.component.scss'
})
export class FormFieldErrorComponent {
  @Input('form-control') formControl!: FormControl

  get errorMessage(): string | null {
    if(this.formControl.invalid && this.formControl.touched) {
      return this.getErrorMessage()
    }
    return null
  }

  private getErrorMessage(): string | null {
    if(this.formControl.errors?.['required']){
      return 'Dado obrigatório!'
    }

    if(this.formControl.errors?.['minlength']){
      const requiredLength = this.formControl.errors?.['minlength']?.['requiredLength']
      return `Deve ter no min ${requiredLength} caracteres`
    }

    if(this.formControl.errors?.['maxlength']){
      const requiredLength = this.formControl.errors?.['minlength']?.['requiredLength']
      return `Deve ter no min ${requiredLength} caracteres`
    }

    return null
  }

}
