import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

formBuilder = inject(FormBuilder);

signUpForm = this.formBuilder.group ({
  email:[''],
  password:[''],
})
onSubmit() {
  console.log(this.signUpForm.value)
}
}
