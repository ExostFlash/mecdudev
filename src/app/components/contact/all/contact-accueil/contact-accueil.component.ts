import { Component, AfterViewInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact-accueil',
  standalone: false,
  templateUrl: './contact-accueil.component.html',
  styleUrl: './contact-accueil.component.css'
})
export class ContactAccueilComponent {
private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private width!: number;
  private height!: number;
  private columns!: number;
  private drops!: number[];
  private readonly characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  private readonly fontSize: number = 16;
  private intervalId: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.canvas = this.el.nativeElement.querySelector('#matrix');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d')!;
      this.initializeMatrix();
      this.intervalId = setInterval(() => this.drawMatrix(), 50);
    }
  }

  private initializeMatrix(): void {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.width / this.fontSize);
    this.drops = Array.from({ length: this.columns }).map(() => 1);
  }

  private drawMatrix(): void {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "darkred";
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.initializeMatrix();
  }
}
