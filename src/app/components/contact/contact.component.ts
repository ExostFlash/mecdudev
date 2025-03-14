import { Component, ViewChild, ViewContainerRef, AfterViewInit, Renderer2, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactAccueilComponent } from './all/contact-accueil/contact-accueil.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('sectionContainer', { read: ViewContainerRef }) sectionContainer!: ViewContainerRef;

  sections = [
    { id: 'home', component: ContactAccueilComponent, css: ['particles-section'] }
  ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.loadSections();
  }

  private loadSections(): void {
    if (!this.sectionContainer) return;
    this.sectionContainer.clear();

    this.sections.forEach(({ id, component, css }) => {
      const sectionElement = this.createSection(id, css);
      this.appendComponentToSection(sectionElement, component);
    });
  }

  private createSection(id: string, cssClasses: string[]): HTMLElement {
    const sectionElement = this.renderer.createElement('section');
    this.renderer.setAttribute(sectionElement, 'id', id);

    cssClasses.forEach(className => this.renderer.addClass(sectionElement, className));

    const hostElement = this.sectionContainer.element.nativeElement;
    this.renderer.appendChild(hostElement, sectionElement);

    return sectionElement;
  }

  private appendComponentToSection(sectionElement: HTMLElement, component: Type<any>): void {
    const componentRef = this.sectionContainer.createComponent(component);
    this.renderer.appendChild(sectionElement, componentRef.location.nativeElement);
  }
}