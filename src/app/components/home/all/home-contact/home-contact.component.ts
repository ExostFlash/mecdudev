import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-home-contact',
  standalone: false,
  templateUrl: './home-contact.component.html',
  styleUrls: ['./home-contact.component.css'],
})
export class HomeContactComponent {
  contactForm: FormGroup;
  contact: any[] = [];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, this.emailValidator]],
      msg: ['', [Validators.required, this.minLengthValidator(10)]],
    });
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const namePattern =
      /^[A-Za-zéèàâêîôûçÉÈÀÂÊÎÔÛÇ]+ [A-Za-zéèàâêîôûçÉÈÀÂÊÎÔÛÇ]+$/; // Vérifie "nom prénom"
    const isValid = namePattern.test(control.value);
    return isValid ? null : { invalidName: true };
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Un pattern plus strict pour les emails
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

  async addContact() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      const nameParts = formData.name.trim().split(' ');
      const firstName =
        nameParts[nameParts.length - 1].charAt(0).toUpperCase() +
        nameParts[nameParts.length - 1].slice(1).toLowerCase();
      const lastName = nameParts
        .slice(0, -1)
        .map((part: string) => part.toUpperCase())
        .join(' ');
      const formattedName = `${lastName} ${firstName}`;

      const newContact = {
        name: formattedName,
        email: formData.email.toLowerCase(),
        message: formData.msg,
        date: new Date(),
      };

      const payload = {
        username: 'MecDu.Dev - Contact',
        content: '📩 Nouveau message depuis le formulaire de contact',
        embeds: [
          {
            color: this.getThemeEmbedColor(),
            fields: [
              {
                name: 'Nom',
                value: newContact.name || 'Non renseigné',
                inline: true,
              },
              {
                name: 'Email',
                value: newContact.email
                  ? `[${newContact.email}](mailto:${newContact.email})`
                  : 'Non renseigné',
                inline: true,
              },
              { name: 'Message', value: newContact.message || 'Non renseigné' },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      try {
        const res = await fetch(
          'https://discord.com/api/webhooks/1477288267383701708/WS5bTfgV8-o2OeZyQRcrziCMm4luAUQ1hZ4OZctoZGJ_S6yJUtNWFdwv7BFyBvLQxn31',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          },
        );

        if (res.ok) {
          // Webhook ok — on considère l'envoi réussi
          this.contactForm.reset();
          return;
        } else {
          console.warn('Webhook responded with non-ok status:', res.status);
          alert("L'envoi via webhook a échoué. Veuillez réessayer plus tard.");
          return;
        }
      } catch (err) {
        console.error('Erreur lors de l envoi au webhook Discord :', err);
        alert(
          "Impossible d'envoyer le message via le webhook. Vérifiez votre connexion et réessayez.",
        );
        return;
      }
    }
  }

  private getThemeEmbedColor(): number {
    try {
      const primary = '#8B0000'; // darkred
      const secondary = '#000000'; // black
      const primaryRgb = this.hexToRgb(primary);
      const secondaryRgb = this.hexToRgb(secondary);
      if (!primaryRgb || !secondaryRgb) return 0x8b0000;
      return this.randomBetweenColors(primaryRgb, secondaryRgb);
    } catch (e) {
      return 0x8b0000;
    }
  }

  private hexToRgb(input: string): { r: number; g: number; b: number } | null {
    if (!input) return null;
    const hex = input.replace(/\s+/g, '');
    if (hex.startsWith('rgb')) {
      const m = hex.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const parts = m[1].split(',').map((p) => parseInt(p.trim(), 10));
      if (parts.length < 3) return null;
      return { r: parts[0], g: parts[1], b: parts[2] };
    }
    let clean = hex;
    if (clean.startsWith('#')) clean = clean.slice(1);
    if (clean.length === 3)
      clean = clean
        .split('')
        .map((c) => c + c)
        .join('');
    if (clean.length !== 6) return null;
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
    return { r, g, b };
  }

  private randomBetweenColors(
    a: { r: number; g: number; b: number },
    bCol: { r: number; g: number; b: number },
  ): number {
    const randBetween = (v1: number, v2: number) =>
      Math.round(v1 + Math.random() * (v2 - v1));
    const r = Math.max(0, Math.min(255, randBetween(a.r, bCol.r)));
    const g = Math.max(0, Math.min(255, randBetween(a.g, bCol.g)));
    const bl = Math.max(0, Math.min(255, randBetween(a.b, bCol.b)));
    return (r << 16) | (g << 8) | bl;
  }
}
