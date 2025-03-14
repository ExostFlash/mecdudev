import { Component, ViewChild, ViewContainerRef, AfterViewInit, Renderer2, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeAccueilComponent } from './all/home-accueil/home-accueil.component';
import { HomeAboutComponent } from './all/home-about/home-about.component';
import { HomeProjetsComponent } from './all/home-projets/home-projets.component';
import { HomeClientsComponent } from './all/home-clients/home-clients.component';
import { HomeContactComponent } from './all/home-contact/home-contact.component';

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
    { id: 'home', component: HomeAccueilComponent, css: ['particles-section'] },
    { id: 'about', component: HomeAboutComponent, css: [] },
    { id: 'project', component: HomeProjetsComponent, css: [] },
    /* { id: 'clients', component: HomeClientsComponent, css: [] }, */
    { id: 'contact', component: HomeContactComponent, css: [] }
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