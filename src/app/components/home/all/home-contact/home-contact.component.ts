import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-contact',
  standalone: false,
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.css']
})
export class HomeContactComponent {
  apiUrl = 'https://gitpushf.uk/mail.php';
  contactForm: FormGroup;
  contact: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, this.emailValidator]],
      msg: ['', [Validators.required, this.minLengthValidator(10)]]
    }); 
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const namePattern = /^[A-Za-zéèàâêîôûçÉÈÀÂÊÎÔÛÇ]+ [A-Za-zéèàâêîôûçÉÈÀÂÊÎÔÛÇ]+$/;  // Vérifie "nom prénom"
    const isValid = namePattern.test(control.value);
    return isValid ? null : { invalidName: true };
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Un pattern plus strict pour les emails
    const isValid = emailPattern.test(control.value);
    return isValid ? null : { invalidEmail: true };
  }

  minLengthValidator(minLength: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      return value.length >= minLength ? null : { minLength: true };
    };
  }

  getErrorName() {
    if (this.contactForm.get('name')?.hasError('required')) {
      return 'Le nom est requis.';
    } else if (this.contactForm.get('name')?.hasError('minLength')) {
      return 'Veuillez entrer un nom et un prénom séparés par un espace.';
    }
    return '';
  }

  getErrorMessage() {
    if (this.contactForm.get('msg')?.hasError('required')) {
      return 'Le message est requis.';
    } else if (this.contactForm.get('msg')?.hasError('minLength')) {
      return 'Le message doit contenir au moins 10 caractères.';
    }
    return '';
  }

  addContact() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[nameParts.length - 1].charAt(0).toUpperCase() +  nameParts[nameParts.length - 1].slice(1).toLowerCase();
      const lastName = nameParts.slice(0, -1).map((part: string) => part.toUpperCase() ).join(' ');
      const formattedName = `${lastName} ${firstName}`;

      const newContact = {
        name: formattedName,
        email: formData.email.toLowerCase(),
        message: formData.msg,
        date: new Date()
      };

      // Envoi des données à mail.php via HTTP POST
      this.http.post(this.apiUrl, newContact).subscribe(
        (response: any) => {
          console.log("Réponse du serveur :", response);
          alert(response.message); // Affiche la réponse du serveur
          this.contactForm.reset(); // Réinitialisation du formulaire
        },
        (error) => {
          console.error("Erreur lors de l'envoi :", error);
          alert("Une erreur est survenue lors de l'envoi du message.");
        }
      );
    }
  }
}
