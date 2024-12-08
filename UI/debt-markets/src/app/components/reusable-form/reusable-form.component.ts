import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reusable-form',
  templateUrl: './reusable-form.component.html',
  styleUrls: ['./reusable-form.component.css']
})
export class ReusableFormComponent implements OnInit {
  @Input() formTitle : string = '';
  @Input() config: any[] = [];
  @Input() submitButtonText: string = 'Submit';
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.formTitle = localStorage.getItem('formTitle') || 'Lender / Collector Form';
  }

  private initializeForm(): void {
    const formControls: { [key: string]: any } = {};

    this.config.forEach(field => {
      formControls[field.name] = [''];
    });

    this.form = this.fb.group(formControls);
  }

  ngOnChanges(): void {
    if (this.form && this.config) {
      this.config.forEach(field => {
        if (!this.form.contains(field.name)) {
          this.form.addControl(field.name, this.fb.control(''));
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}
