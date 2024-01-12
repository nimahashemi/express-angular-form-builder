import { Component, OnInit } from '@angular/core';
import { FormService } from '../_services/form.service';
import { Form, status, method } from '../_interfaces/form'; 
import { Element, htmlInput } from '../_interfaces/element';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  forms: any[] = [];
  isSuccessful = false;
  errorMessage = '';

  formField: Element = {
    type: htmlInput.TEXT,
    name: '',
    id: '',
    value: '',
    size: '',
    maxlength: '',
    min: '',
    max: '',
    pattern: '',
    required: false,
    step: '',
    width: '',
    height: '',
    list: '',
    label: '',
    placeholder: '',
    options: [''],
    isMulti: false
  }

  form: Form = {
    name: '',
    status: status.ACTIVE || '',
    action: '',
    method: method.POST || '',
    fields: [this.formField],
  };

  constructor(private formService: FormService) { }

  async ngOnInit(): Promise<void> {
    (await this.formService.getForms(0, 15)).subscribe({
      next: (data: any) => {
        console.log(data);
        this.forms = data;
      },
      error: (err: { error: { message: string; }; }) => {
        console.log(err);
      }
    })
  }

  async onSubmit() {
    const { name, status, action, method } = this.form;
    (await this.formService.createForm(name, status, action, method, false)).subscribe({
      next: (data: any) => {
        console.log(data);
        this.isSuccessful = true;
        this.reloadPage()
      },
      error: (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
