import { Component, ViewChild, ViewContainerRef, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilComponent } from './all/accueil/accueil.component';
import { AproposComponent } from './all/apropos/apropos.component';
import { ProjectComponent } from './all/project/project.component';
import { ClientsComponent } from './all/clients/clients.component';
import { ServicesComponent } from './all/services/services.component';
import { ContactComponent } from './all/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('sectionContainer', { read: ViewContainerRef }) sectionContainer!: ViewContainerRef;

  sections = [
    { id: 'home', component: AccueilComponent },
    { id: 'apropos', component: AproposComponent },
    { id: 'project', component: ProjectComponent },
    { id: 'contact', component: ContactComponent }
  ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.loadSections();
    this.checkSectionVisibility(); // Vérifie la visibilité des sections au démarrage
    window.addEventListener('scroll', this.onScroll.bind(this)); // Ajoute un écouteur pour le scroll
  }

  loadSections() {
    if (!this.sectionContainer) return;
    this.sectionContainer.clear(); // Nettoyer le conteneur avant d'ajouter de nouvelles sections

    this.sections.forEach(({ id, component }) => {
      // 1️⃣ Créer dynamiquement une balise <section>
      const sectionElement = this.renderer.createElement('section');
      this.renderer.setAttribute(sectionElement, 'id', id);

      if (id == 'home') {
        this.renderer.addClass(sectionElement, 'particles-section'); // Ajouter une classe CSS optionnelle
      }

      // 2️⃣ Ajouter la section au DOM
      const hostElement = this.sectionContainer.element.nativeElement;
      this.renderer.appendChild(hostElement, sectionElement);

      // 3️⃣ Créer dynamiquement le composant
      const componentRef = this.sectionContainer.createComponent(component);

      // 4️⃣ Attacher le composant à la section
      this.renderer.appendChild(sectionElement, componentRef.location.nativeElement);
    });
  }

  onScroll() {
    this.checkSectionVisibility(); // Vérifie la visibilité des sections à chaque scroll
  }

  checkSectionVisibility() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section: HTMLElement) => {
      const rect = section.getBoundingClientRect();
      // Vérifie si la section est visible dans le viewport
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        section.classList.add('visible'); // Affiche la section
      } else {
        section.classList.remove('visible'); // Masque la section si elle n'est pas visible
      }
    });
  }
}
