import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit, OnDestroy {
  activeId = 'home';
  private observer?: IntersectionObserver;
  private hashHandler = () => {
    const h = location.hash.replace('#', '');
    if (h) this.activeId = h;
  };
  private scrollHandler = () => {
    const ids = ['home', 'abouts', 'projets', 'contact'];
    const center = window.innerHeight / 2;
    let closestId = this.activeId;
    let closestDist = Infinity;
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.abs(elCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closestId = id;
      }
    });
    if (closestId !== this.activeId) this.activeId = closestId;
  };

  constructor(private router: Router) {}

  isHomeActive(): boolean {
    return this.activeId === 'home';
  }

  isHomeActiveBool(): boolean {
    return this.activeId !== 'home';
  }

  ngOnInit(): void {
    const ids = ['home', 'abouts', 'projets', 'contact'];
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).id;
          if (id) this.activeId = id;
        }
      });
    }, options);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.observer?.observe(el);
    });

    // initialize from hash if present
    const h = location.hash.replace('#', '');
    if (h) this.activeId = h;
    window.addEventListener('hashchange', this.hashHandler);
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    // run once to initialize
    setTimeout(() => this.scrollHandler(), 100);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    window.removeEventListener('hashchange', this.hashHandler);
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollTo(id: string, event?: Event) {
    if (event) event.preventDefault();
    // If not on root, navigate there first then scroll
    const onRoot = this.router.url === '/' || this.router.url === '/home';
    const doScroll = () => {
      const el =
        document.getElementById(id) || document.querySelector(`#${id}`);
      if (el) {
        (el as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        try {
          history.replaceState(null, '', `#${id}`);
        } catch {}
      }
    };

    if (!onRoot) {
      this.router.navigate(['/']).then(() => setTimeout(doScroll, 120));
    } else {
      doScroll();
    }
    this.activeId = id;
  }
}
