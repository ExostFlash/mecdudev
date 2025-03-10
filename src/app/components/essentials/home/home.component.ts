import { Component, ViewChild, ViewContainerRef, AfterViewInit, Renderer2, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilComponent } from './all/accueil/accueil.component';
import { AproposComponent } from './all/apropos/apropos.component';
import { ProjectComponent } from './all/project/project.component';
import { ClientsComponent } from './all/clients/clients.component';
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
    { id: 'home', component: AccueilComponent, css: ['particles-section'] },
    { id: 'about', component: AproposComponent, css: [] },
    { id: 'project', component: ProjectComponent, css: [] },
    /* { id: 'clients', component: ClientsComponent, css: [] }, */
    { id: 'contact', component: ContactComponent, css: [] }
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