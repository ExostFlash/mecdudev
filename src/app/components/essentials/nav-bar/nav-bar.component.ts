import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router) {}
  
  isHomeActive(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }

  isHomeActiveBool(): boolean {
    if (this.router.url != '/home') {
      return true
    } else {
      return false
    }
  }
}