import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Essential */
import { LoaderComponent } from './components/essentials/loader/loader.component';
import { NavBarComponent } from './components/essentials/nav-bar/nav-bar.component';
import { FooterComponent } from './components/essentials/footer/footer.component';

/* Home */
import { HomeComponent } from './components/home/home.component';
import { HomeAccueilComponent } from './components/home/all/home-accueil/home-accueil.component';
import { HomeAboutComponent } from './components/home/all/home-about/home-about.component';
import { HomeClientsComponent } from './components/home/all/home-clients/home-clients.component';
import { HomeProjetsComponent } from './components/home/all/home-projets/home-projets.component';
import { HomeServicesComponent } from './components/home/all/home-services/home-services.component';
import { HomeContactComponent } from './components/home/all/home-contact/home-contact.component';

/* Contact */
import { ContactComponent } from './components/contact/contact.component';
import { ContactAccueilComponent } from './components/contact/all/contact-accueil/contact-accueil.component';


@NgModule({
  declarations: [
    AppComponent,
    /* Essential */
    LoaderComponent,
    NavBarComponent,
    FooterComponent,
    /* Home */
    HomeAccueilComponent,
    HomeAboutComponent,
    HomeClientsComponent,
    HomeProjetsComponent,
    HomeServicesComponent,
    HomeContactComponent,
    /* Contact */
    ContactAccueilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeComponent,
    ContactComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
