import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-projets',
  standalone: false,
  templateUrl: './home-projets.component.html',
  styleUrl: './home-projets.component.css'
})
export class HomeProjetsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carouselInner', { static: false }) carouselInner!: ElementRef;
  @ViewChild('prevButton', { static: false }) prevButton!: ElementRef;
  @ViewChild('nextButton', { static: false }) nextButton!: ElementRef;
  @ViewChild('dotsContainer', { static: false }) dotsContainer!: ElementRef;

  nosProjets = [
    { Name: "TeamFlash — Corporation", Link: "teamflash.fr", Logo: "teamflash.png", Description: "Ce site professionnel est conçu pour présenter les projets que nous avons réalisés pour divers clients. Vous y trouverez une sélection de nos travaux, illustrant notre expertise et notre engagement à fournir des services de haute qualité. Chaque projet présenté ici reflète notre capacité à répondre aux besoins spécifiques de nos clients, qu'il s'agisse de particuliers ou d'entreprises. Nous vous invitons à parcourir nos réalisations pour découvrir comment nous pouvons vous aider à atteindre vos objectifs." },
    { Name: "Streamify", Link: "/", Logo: "no.png", Description: "Streamify est votre site de référence pour découvrir et suivre les dernières bandes-annonces de films et séries. Sur Streamify, vous pouvez regarder les bandes-annonces, consulter les fiches des acteurs, lire les synopsis détaillés, et ajouter vos films et séries préférés à votre liste de favoris. Que vous soyez cinéphile ou amateur de séries, Streamify vous offre une expérience complète pour explorer le monde du cinéma et de la télévision. Parcourez notre catalogue et découvrez bien plus encore sur Streamify." },
    { Name: "Mixify", Link: "/", Logo: "no.png", Description: "Mixify est une plateforme dédiée à la création de bars virtuels pour des soirées entre amis. Sur Mixify, vous pouvez créer votre propre espace, inviter vos amis, et organiser des soirées conviviales, tout en partageant des cocktails et des discussions animées. La plateforme offre des fonctionnalités interactives pour personnaliser votre bar virtuel et rendre chaque soirée unique et mémorable. Que ce soit pour une fête d'anniversaire, une soirée à thème, ou simplement pour se retrouver, Mixify rend vos soirées plus fun et engageantes." },
    { Name: "PixelPanda", Link: "/", Logo: "pixelpanda.webp", Description: "PixelPanda est un bot discord développer par les soins de TeamFlash. Ce bot peux faire quelque chose mais sera plus utiliser sur le discord de mes étude." }
  ];

  // Fonction pour formater correctement les liens
  getSafeUrl(link: string): string {
    return link.startsWith('http') ? link : `https://${link}`;
  }

  slides: HTMLElement[] = [];
  dots: HTMLElement[] = [];
  currentIndex = 0;
  intervalId: any;
  startX = 0;
  isDragging = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.slides = Array.from(this.carouselInner.nativeElement.children);
    this.createDots();
    this.updateSlide(this.currentIndex);
    this.setupEventListeners();
    this.resetInterval();
  }

  createDots() {
    this.slides.forEach((_, index) => {
      const dot = this.renderer.createElement('span');
      this.renderer.setAttribute(dot, 'data-index', index.toString());
      this.renderer.listen(dot, 'click', () => this.updateSlide(index));
      this.renderer.appendChild(this.dotsContainer.nativeElement, dot);
    });
    this.dots = Array.from(this.dotsContainer.nativeElement.children);
    this.dots[this.currentIndex].classList.add('active');
  }

  updateSlide(index: number) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;
    this.currentIndex = index;
    this.renderer.setStyle(
      this.carouselInner.nativeElement,
      'transform',
      `translateX(-${index * 100}%)`
    );
    this.dots.forEach(dot => dot.classList.remove('active'));
    this.dots[index].classList.add('active');
    this.resetInterval();
  }

  resetInterval() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.updateSlide(this.currentIndex + 1), 3000);
  }

  startDrag(event: MouseEvent | TouchEvent) {
    this.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.isDragging = true;
    clearInterval(this.intervalId);
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const diffX = this.startX - currentX;
    if (Math.abs(diffX) > 50) {
      this.updateSlide(this.currentIndex + (diffX > 0 ? 1 : -1));
      this.isDragging = false;
    }
  }

  endDrag() {
    this.isDragging = false;
  }

  setupEventListeners() {
    const inner = this.carouselInner.nativeElement;
    this.renderer.listen(inner, 'mousedown', (e) => this.startDrag(e));
    this.renderer.listen(inner, 'mousemove', (e) => this.onDrag(e));
    this.renderer.listen(inner, 'mouseup', () => this.endDrag());
    this.renderer.listen(inner, 'mouseleave', () => this.endDrag());
    this.renderer.listen(inner, 'touchstart', (e) => this.startDrag(e));
    this.renderer.listen(inner, 'touchmove', (e) => this.onDrag(e));
    this.renderer.listen(inner, 'touchend', () => this.endDrag());
    this.renderer.listen(this.prevButton.nativeElement, 'click', () => this.updateSlide(this.currentIndex - 1));
    this.renderer.listen(this.nextButton.nativeElement, 'click', () => this.updateSlide(this.currentIndex + 1));
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
