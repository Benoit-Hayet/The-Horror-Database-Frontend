import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { UploadFileService } from '../../../services/upload-file.service';


@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  registerForm: FormGroup;
  
   router: Router = inject(Router); // Injection du service Router
   

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uploadFileService: UploadFileService,
  
  ) {
    this.registerForm = this.formBuilder.group({
      
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s-]+$')],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s-]+$')],
      ],
      avatarUrl:'',
      username: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s-]+$')],
      ],

      birthdate: ['', [Validators.required, this.dateValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Valeurs du formulaire envoyées:', this.registerForm.value);
  
      const { firstName, lastName, avatarUrl, birthdate, username, email, password } =
        this.registerForm.value;
  
      if (!avatarUrl) {
        console.warn('⚠ avatarUrl est vide ou non défini !');
      }
  
      this.authService
        .register(
          firstName,
          lastName,
          avatarUrl,
          birthdate,
          username,
          email,
          password,
          'USER',
        )
        .subscribe(
          (response: unknown) => {
            console.log('Inscription réussie :', response);
            return this.router.navigate(['/login']);
          },
          (error: any) => {
            console.error("Erreur lors de l'inscription :", error?.error || error?.message || error);
          }
        );
    } else {
      console.log('Le formulaire est invalide :', this.registerForm.errors);
    }
  }
  

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.uploadFileService.uploadFile(file).subscribe({
      next: (response: any) => {
        console.log('Réponse de l’upload:', response); // Vérifie que secure_url est bien présent
        this.registerForm.get('avatarUrl')?.setValue(response.secure_url);
        this.registerForm.get('avatarUrl')?.valueChanges.subscribe(value => {
          console.log('Nouvelle valeur de avatarUrl:', value);
        });
        
      },
      error: (error) => {
        console.error('Erreur lors de l’upload:', error);
      }
    });
  }
  
 

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
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
