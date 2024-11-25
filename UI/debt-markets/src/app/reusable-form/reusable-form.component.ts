import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reusable-form',
  templateUrl: './reusable-form.component.html',
  styleUrls: ['./reusable-form.component.css']
})
export class ReusableFormComponent implements OnInit {
  @Input() formTitle : string = '';
  @Input() config!: { name: string; label: string; type: string; errorMessage: string }[];
  @Input() submitButtonText: string = 'Submit';
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formTitle = localStorage.getItem('formTitle') || 'Lender / Collector Form';
    const formControls = this.config.reduce((controls, field) => {
      controls[field.name] = ['', Validators.required];
      return controls;
    }, {} as { [key: string]: any });

    this.form = this.fb.group(formControls);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
