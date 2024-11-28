import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder,private authService:AuthService) { 
  this.registerForm = this.formBuilder.group ({
    firstName:['',[Validators.required,Validators.pattern('^[a-zA-ZÀ-ÿ\\s-]+$')]],
    lastName: ['',[Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s-]+$')]],
    username: ['',[Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s-]+$')]],

    birthdate:['',[Validators.required, this.dateValidator]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],

  });
}

  onSubmit():void {
    if (this.registerForm.valid) { 
      const {firstName, lastName, birthdate,username, email, password } = this.registerForm.value;
      const role = 'USER';
      this.authService.register(firstName, lastName, birthdate, username, email, password ,role).subscribe(
        (response) => {
          console.log('Inscription réussie', response);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
      
    }
  }

  dateValidator(control: AbstractControl): {[key: string]: any} | null {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Format YYYY-MM-DD
    const value = control.value;

    if (value && !dateRegex.test(value)) {
      return { invalidDateFormat: 'Le format de la date doit être YYYY-MM-DD' };
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return { invalidDate: 'La date est invalide' };
    }

    return null; // La validation est réussie
  }
  }

