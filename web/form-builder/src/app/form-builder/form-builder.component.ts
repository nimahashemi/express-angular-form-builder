import { Component, OnInit } from '@angular/core';
import { FormService } from '../_services/form.service';
import { ActivatedRoute } from '@angular/router';
import { Form, status, method } from '../_interfaces/form';
import { Element, htmlInput } from '../_interfaces/element';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.css'
})
export class FormBuilderComponent implements OnInit {
  dynamicForm: FormGroup = this.formBuilder.group({});
  errorMessage = '';
  successMessage = '';
  formId: string = '';

  formData: any = {
    formId: '',
    data: [],
  };

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
  value: any;

  constructor(private formService: FormService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    let formGroup: Record<string, any> = {};
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      (await this.formService.getFormById(id)).subscribe({
        next: (data: any) => {
          this.formId = id;
          this.form = data;
          data.fields.forEach((control: { name: string | number | ''; }) => {
            formGroup[control.name] = [''];
          });

          this.dynamicForm = this.formBuilder.group(formGroup);
        },
        error: (err: { error: { message: string; }; }) => {
          this.errorMessage = err.error.message;
        }
      });
    } else {
      this.errorMessage = 'Form not found';
      this.reloadPage();
    }
  };

  async onAdd() {
    const fId = this.route.snapshot.paramMap.get('id')
    if (!fId) throw new Error();

    const { type, name, id, value, size, maxlength, min, max, pattern, required, step, width, height, list, label, placeholder, options, isMulti } = this.formField;
    const element: Element = {
      type: type || '',
      name: name || '',
      id: id || '',
      value: value || '',
      size: size || '',
      maxlength: maxlength || '',
      min: min || '',
      max: max || '',
      pattern: pattern || '',
      required: required || false,
      step: step || '',
      width: width || '',
      height: height || '',
      list: list || '',
      label: label || '',
      placeholder: placeholder || '',
      options: options || [],
      isMulti: isMulti || false
    };
    this.form.fields?.push(element);

    (await this.formService.updateForm(fId, undefined, undefined, undefined, false, this.form.fields)).subscribe({
      next: (data: any) => {
      },
      error: (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
      }
    });
    this.reloadPage();
  };

  async onSave() {
    console.log(this.dynamicForm.value);
    const fId = this.route.snapshot.paramMap.get('id')
    if (!fId) throw new Error();

    // const data: any = new Map();
    // if (this.form && this.form.fields) {
    //   for (let i = 0; i < this.form.fields?.length; i += 1) {
    //     const field = this.form.fields[i];
    //     data.set(field.name,)
    //   }
    // }


    (await this.formService.saveForm(fId, this.dynamicForm.value)).subscribe({
      next: (data: any) => {
        this.successMessage = 'Save Form SuccessFull.'
      },
      error: (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
      }
    });
  };

  reloadPage(): void {
    window.location.reload();
  };
}
