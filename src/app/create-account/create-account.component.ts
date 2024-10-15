import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  formBuilder = inject(FormBuilder);

  registerForm = this.formBuilder.group ({
    name:[''],
    lastname:[''],
    dateOfBirth:[''],
    email:[''],
    password:[''],
  })
  onSubmit() {
    console.log(this.registerForm.value)
  }
  }

