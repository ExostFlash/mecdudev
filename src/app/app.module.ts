import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

/* Abouts */
import { AboutsComponent } from './components/abouts/abouts.component';
import { AboutAccueilComponent } from './components/abouts/all/about-accueil/about-accueil.component';

/* Projets */
import { ProjetsComponent } from './components/projets/projets.component';
import { ProjetAccueilComponent } from './components/projets/all/projet-accueil/projet-accueil.component';

/* Contact */
import { ContactComponent } from './components/contact/contact.component';
import { ContactAccueilComponent } from './components/contact/all/contact-accueil/contact-accueil.component';
import { ContactMessageComponent } from './components/contact/all/contact-message/contact-message.component';
import { ContactCordoComponent } from './components/contact/all/contact-cordo/contact-cordo.component';


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
    /* Abouts */
    AboutAccueilComponent,
    /* Projets */
    ProjetAccueilComponent,
    /* Contact */
    ContactAccueilComponent,
    ContactMessageComponent,
    ContactCordoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeComponent,
    AboutsComponent,
    ProjetsComponent,
    ContactComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
